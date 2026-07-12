"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Clock, Bookmark } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import type { JobDocument } from "@/types/job";

interface JobCardProps {
  job: JobDocument;
}

function formatSalary(amount: number): string {
  return amount >= 1000 ? `${Math.round(amount / 1000)}K` : `${amount}`;
}

function timeAgo(date: Date): string {
  const diffMs = Date.now() - new Date(date).getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

export default function JobCard({ job }: JobCardProps) {
  const { data: session } = authClient.useSession();
  const jobId = job._id?.toString();

  const [isSaved, setIsSaved] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  // পেজ লোড হওয়ার সময় এই জবটা আগে থেকেই saved কিনা চেক করা
  useEffect(() => {
    if (!session?.user?.id || !jobId) return;

    fetch(`/api/saved-jobs?userId=${session.user.id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          const saved = json.data.some((j: JobDocument) => j._id?.toString() === jobId);
          setIsSaved(saved);
        }
      });
  }, [session?.user?.id, jobId]);

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault(); // Link এর ভিতরে বাটন থাকায়, ক্লিক করলে যাতে Details পেজে চলে না যায়
    e.stopPropagation();

    if (!session?.user?.id) {
      // লগইন না থাকলে সরাসরি লগইন পেজে পাঠানো যেতে পারতো, কিন্তু আপাতত সহজভাবে কিছু না করাই রাখছি
      return;
    }

    setIsToggling(true);
    const res = await fetch("/api/saved-jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: session.user.id, jobId }),
    });
    const json = await res.json();
    if (json.success) setIsSaved(json.saved);
    setIsToggling(false);
  };

  return (
    <Link
      href={`/jobs/${jobId}`}
      className="block rounded-card border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white ${job.companyColor}`}
          >
            {job.companyInitial}
          </span>
          <div>
            <h3 className="font-semibold text-neutral-900">{job.title}</h3>
            <p className="text-sm text-neutral-600">{job.company}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggleSave}
          disabled={isToggling}
          aria-label={isSaved ? "Unsave job" : "Save job"}
          className={`transition-colors ${isSaved ? "text-primary-500" : "text-neutral-400 hover:text-primary-500"}`}
        >
          <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-neutral-600">
        <span className="flex items-center gap-1">
          <MapPin size={13} /> {job.location}
        </span>
        <span className="rounded-full bg-neutral-100 px-2 py-1 font-medium">{job.jobType}</span>
        <span className="flex items-center gap-1">
          <Clock size={13} /> {timeAgo(job.createdAt)}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
        <p className="text-sm font-semibold text-primary-600">
          ${formatSalary(job.salaryMin)} - ${formatSalary(job.salaryMax)}
        </p>
        <span className="text-xs font-medium text-neutral-500">{job.experienceLevel}</span>
      </div>
    </Link>
  );
}