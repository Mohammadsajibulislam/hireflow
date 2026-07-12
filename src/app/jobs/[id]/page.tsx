"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MapPin, Clock, Briefcase, DollarSign, Bookmark, Share2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { authClient } from "@/lib/auth-client";
import type { JobDocument } from "@/types/job";

export default function JobDetailsPage() {
  const params = useParams<{ id: string }>();
  const { data: session } = authClient.useSession();

  const [job, setJob] = useState<JobDocument | null>(null);
  const [related, setRelated] = useState<JobDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Apply সংক্রান্ত state
  const [hasApplied, setHasApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [applyMessage, setApplyMessage] = useState("");

  useEffect(() => {
    async function fetchJob() {
      setIsLoading(true);
      const res = await fetch(`/api/jobs/${params.id}`);
      const json = await res.json();

      if (!json.success) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      setJob(json.data);
      setRelated(json.related);

      // এই ইউজার আগেই apply করেছে কিনা চেক করা (যদি লগইন থাকে)
      if (session?.user?.id) {
        const appRes = await fetch(`/api/applications?userId=${session.user.id}`);
        const appJson = await appRes.json();
        if (appJson.success) {
          const applied = appJson.data.some((app: { jobId: string }) => app.jobId === params.id);
          setHasApplied(applied);
        }
      }

      setIsLoading(false);
    }

    fetchJob();
  }, [params.id, session?.user?.id]);

  const handleApply = async () => {
    if (!session?.user) {
      setApplyMessage("Please login to apply for this job");
      return;
    }
    if (!job) return;

    setIsApplying(true);
    setApplyMessage("");

    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.user.id,
        jobId: params.id,
        jobTitle: job.title,
        company: job.company,
      }),
    });
    const json = await res.json();

    setIsApplying(false);

    if (!json.success) {
      setApplyMessage(json.error || "Failed to apply");
      return;
    }

    setHasApplied(true);
    setApplyMessage("Application submitted successfully!");
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[50vh] items-center justify-center text-neutral-600">Loading...</div>
      </>
    );
  }

  if (notFound || !job) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
          <p className="text-lg font-semibold text-neutral-900">Job not found</p>
          <Link href="/jobs" className="text-sm text-primary-600 hover:underline">
            &larr; Back to Browse Jobs
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-neutral-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* হেডার ব্যানার */}
          <div className="rounded-card bg-primary-600 p-6 text-white sm:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-xl text-2xl font-bold text-white ${job.companyColor}`}
                >
                  {job.companyInitial}
                </span>
                <div>
                  <h1 className="text-xl font-bold sm:text-2xl">{job.title}</h1>
                  <p className="mt-1 text-primary-100">{job.company}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-primary-100">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={13} /> {job.jobType}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {job.experienceLevel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={handleApply}
                    disabled={hasApplied || isApplying}
                    className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50 disabled:opacity-60"
                  >
                    {hasApplied ? "Applied ✓" : isApplying ? "Applying..." : "Apply Now"}
                  </button>
                  <button
                    aria-label="Save job"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <Bookmark size={18} />
                  </button>
                </div>
                {applyMessage && (
                  <p className={`text-xs ${hasApplied ? "text-accent-100" : "text-red-100"}`}>{applyMessage}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* বাম পাশ — বিস্তারিত বর্ণনা */}
            <div className="space-y-6 lg:col-span-2">
              <section className="rounded-card border border-neutral-200 bg-white p-6">
                <h2 className="font-semibold text-neutral-900">Job Description</h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{job.description}</p>
              </section>

              <section className="rounded-card border border-neutral-200 bg-white p-6">
                <h2 className="font-semibold text-neutral-900">Responsibilities</h2>
                <ul className="mt-3 space-y-2">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-neutral-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-card border border-neutral-200 bg-white p-6">
                <h2 className="font-semibold text-neutral-900">Requirements</h2>
                <ul className="mt-3 space-y-2">
                  {job.requirements.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-neutral-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* ডান পাশ */}
            <div className="space-y-6">
              <section className="rounded-card border border-neutral-200 bg-white p-6">
                <h2 className="font-semibold text-neutral-900">Job Details</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-neutral-600">Job Type</dt>
                    <dd className="font-medium text-neutral-900">{job.jobType}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-neutral-600">Experience</dt>
                    <dd className="font-medium text-neutral-900">{job.experienceLevel}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-neutral-600">Salary</dt>
                    <dd className="flex items-center gap-1 font-medium text-neutral-900">
                      <DollarSign size={13} /> {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-neutral-600">Location</dt>
                    <dd className="font-medium text-neutral-900">{job.location}</dd>
                  </div>
                </dl>
              </section>

              <section className="rounded-card border border-neutral-200 bg-white p-6">
                <h2 className="flex items-center gap-2 font-semibold text-neutral-900">
                  <Share2 size={16} /> Share Job
                </h2>
                <p className="mt-2 text-xs text-neutral-500">
                  Copy the link and share this opportunity with others.
                </p>
              </section>

              {related.length > 0 && (
                <section className="rounded-card border border-neutral-200 bg-white p-6">
                  <h2 className="font-semibold text-neutral-900">Similar Jobs</h2>
                  <div className="mt-4 space-y-3">
                    {related.map((r) => (
                      <Link
                        key={r._id?.toString()}
                        href={`/jobs/${r._id?.toString()}`}
                        className="block rounded-lg border border-neutral-100 p-3 transition-colors hover:border-primary-200 hover:bg-primary-50"
                      >
                        <p className="text-sm font-medium text-neutral-900">{r.title}</p>
                        <p className="mt-1 text-xs text-neutral-600">
                          {r.company} &middot; {r.location}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}