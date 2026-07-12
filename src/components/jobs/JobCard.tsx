import Link from "next/link";
import { MapPin, Clock, Bookmark } from "lucide-react";
import type { JobDocument } from "@/types/job";

interface JobCardProps {
  job: JobDocument;
}

// সংখ্যাকে "80K" এর মতো সংক্ষিপ্ত ফরম্যাটে দেখানোর জন্য utility function
function formatSalary(amount: number): string {
  return amount >= 1000 ? `${Math.round(amount / 1000)}K` : `${amount}`;
}

// কতদিন আগে পোস্ট হয়েছে, সেটা মানুষের পড়ার মতো ফরম্যাটে দেখানো
function timeAgo(date: Date): string {
  const diffMs = Date.now() - new Date(date).getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job._id}`}
      className="block rounded-card border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* কোম্পানির initial ব্যাজ — TopCompanies.tsx তে ব্যবহৃত একই প্যাটার্ন */}
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

        {/* Bookmark বাটন — এখন শুধু UI, Phase 7 এ কার্যকর করা হবে */}
        <button
          type="button"
          aria-label="Save job"
          className="text-neutral-400 transition-colors hover:text-primary-500"
        >
          <Bookmark size={18} />
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