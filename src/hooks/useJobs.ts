"use client";

import { useEffect, useState } from "react";
import type { JobDocument } from "@/types/job";

interface Pagination {
  page: number;
  totalPages: number;
  totalJobs: number;
}

interface UseJobsParams {
  search: string;
  category: string;
  jobType: string;
  sort: string;
  page: number;
}

interface UseJobsResult {
  jobs: JobDocument[];
  pagination: Pagination | null;
  isLoading: boolean;
  error: string | null;
}

export function useJobs(params: UseJobsParams): UseJobsResult {
  const [jobs, setJobs] = useState<JobDocument[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // প্রতিবার params বদলালে নতুন করে fetch করা — কিন্তু আগেরটা "বাতিল" করার ব্যবস্থা সহ (নিচে ব্যাখ্যা)
    const controller = new AbortController();

    async function fetchJobs() {
      setIsLoading(true);
      setError(null);

      try {
        const query = new URLSearchParams({
          search: params.search,
          category: params.category,
          jobType: params.jobType,
          sort: params.sort,
          page: params.page.toString(),
        });

        const res = await fetch(`/api/jobs?${query.toString()}`, {
          signal: controller.signal,
        });
        const json = await res.json();

        if (!json.success) throw new Error(json.error || "Failed to load jobs");

        setJobs(json.data);
        setPagination(json.pagination);
      } catch (err) {
        // AbortError মানে আমরা নিজেরাই request বাতিল করেছি — এটা আসল এরর না, তাই দেখানো হবে না
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobs();

    // cleanup — component সরে গেলে বা params আবার বদলালে আগের request বাতিল হবে
    return () => controller.abort();
  }, [params.search, params.category, params.jobType, params.sort, params.page]);

  return { jobs, pagination, isLoading, error };
}