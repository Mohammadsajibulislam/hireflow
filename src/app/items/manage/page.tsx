"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Trash2, Briefcase, AlertCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import type { JobDocument } from "@/types/job";

export default function ManageJobsPage() {
  const { session, isPending } = useRequireAuth({ allowedRoles: ["recruiter", "admin"] });

  const [jobs, setJobs] = useState<JobDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session) return; // session আসার আগে fetch করার দরকার নেই

    async function fetchJobs() {
      const res = await fetch("/api/jobs?limit=100"); // সব জব একসাথে আনা, manage view এর জন্য
      const json = await res.json();
      if (json.success) setJobs(json.data);
      setIsLoading(false);
    }

    fetchJobs();
  }, [session]);

  const handleDelete = async (id: string | undefined, title: string) => {
    if (!id) return;

    // Requirement এর কোথাও confirm dialog বলা নেই, কিন্তু delete এর মতো destructive action এ এটা জরুরি UX practice
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirmed) return;

    setDeletingId(id);
    setError("");

    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      const json = await res.json();

      if (!json.success) {
        setError(json.error || "Failed to delete job");
        return;
      }

      // সার্ভারে ডিলিট সফল হলে, লোকাল state থেকেও সাথে সাথে বাদ দেওয়া — পুরো লিস্ট আবার fetch করার দরকার নেই
      setJobs((prev) => prev.filter((job) => job._id?.toString() !== id));
    } catch {
      setError("Something went wrong while deleting");
    } finally {
      setDeletingId(null);
    }
  };

  if (isPending || !session) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[50vh] items-center justify-center text-neutral-600">Checking access...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-neutral-50 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Manage Jobs</h1>
              <p className="mt-1 text-sm text-neutral-600">{jobs.length} job listings</p>
            </div>
            <Link
              href="/items/add"
              className="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-600"
            >
              + Post New Job
            </Link>
          </div>

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <div className="mt-6 overflow-hidden rounded-card border border-neutral-200 bg-white">
            {isLoading ? (
              <div className="p-8 text-center text-sm text-neutral-600">Loading jobs...</div>
            ) : jobs.length === 0 ? (
              <div className="flex flex-col items-center gap-3 p-12 text-center">
                <Briefcase size={32} className="text-neutral-300" />
                <p className="text-sm text-neutral-600">No jobs posted yet</p>
                <Link href="/items/add" className="text-sm font-medium text-primary-600 hover:underline">
                  Post your first job
                </Link>
              </div>
            ) : (
              <>
                {/* ডেস্কটপে টেবিল ভিউ — Requirement: "table/grid" */}
                <table className="hidden w-full text-left text-sm sm:table">
                  <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase text-neutral-600">
                    <tr>
                      <th className="px-5 py-3">Job Title</th>
                      <th className="px-5 py-3">Company</th>
                      <th className="px-5 py-3">Location</th>
                      <th className="px-5 py-3">Type</th>
                      <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {jobs.map((job) => (
                      <tr key={job._id?.toString()}>
                        <td className="px-5 py-4 font-medium text-neutral-900">{job.title}</td>
                        <td className="px-5 py-4 text-neutral-600">{job.company}</td>
                        <td className="px-5 py-4 text-neutral-600">{job.location}</td>
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700">
                            {job.jobType}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/jobs/${job._id?.toString()}`}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-primary-600"
                              aria-label="View job"
                            >
                              <Eye size={16} />
                            </Link>
                            <button
                              onClick={() => handleDelete(job._id?.toString(), job.title)}
                              disabled={deletingId === job._id?.toString()}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                              aria-label="Delete job"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* মোবাইলে কার্ড ভিউ — টেবিল ছোট স্ক্রিনে পড়া কঠিন, তাই আলাদা লেআউট */}
                <div className="divide-y divide-neutral-100 sm:hidden">
                  {jobs.map((job) => (
                    <div key={job._id?.toString()} className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-neutral-900">{job.title}</p>
                          <p className="mt-1 text-sm text-neutral-600">
                            {job.company} &middot; {job.location}
                          </p>
                          <span className="mt-2 inline-block rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700">
                            {job.jobType}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/jobs/${job._id?.toString()}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100"
                          >
                            <Eye size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(job._id?.toString(), job.title)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}