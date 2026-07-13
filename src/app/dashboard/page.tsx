"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, Bookmark, Clock, MapPin, TrendingUp } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import type { ApplicationDocument } from "@/types/activity";
import type { JobDocument } from "@/types/job";

// Application status অনুযায়ী রঙ — Admin Dashboard এও একই ধরনের রঙ ব্যবহার হবে, consistency এর জন্য
const statusStyles: Record<string, string> = {
  "Under Review": "bg-yellow-50 text-yellow-700",
  Shortlisted: "bg-accent-50 text-accent-600",
  "In Progress": "bg-primary-50 text-primary-600",
  Rejected: "bg-red-50 text-red-600",
};

export default function CandidateDashboardPage() {
  const { session, isPending } = useRequireAuth();

  const [applications, setApplications] = useState<ApplicationDocument[]>([]);
  const [savedJobs, setSavedJobs] = useState<JobDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.id) return;

    async function fetchData() {
      const [appsRes, savedRes] = await Promise.all([
        fetch(`/api/applications?userId=${session!.user.id}`),
        fetch(`/api/saved-jobs?userId=${session!.user.id}`),
      ]);
      const appsJson = await appsRes.json();
      const savedJson = await savedRes.json();

      if (appsJson.success) setApplications(appsJson.data);
      if (savedJson.success) setSavedJobs(savedJson.data);
      setIsLoading(false);
    }

    fetchData();
  }, [session?.user?.id]);

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
          <h1 className="text-2xl font-bold text-neutral-900">Welcome back, {session.user.name.split(" ")[0]}! 👋</h1>
          <p className="mt-1 text-sm text-neutral-600">Here&apos;s what&apos;s happening with your job search</p>

          {/* Stat কার্ড — ৩টা সংখ্যা এক নজরে */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-card border border-neutral-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <Briefcase size={20} />
                </span>
                <div>
                  <p className="text-2xl font-bold text-neutral-900">{applications.length}</p>
                  <p className="text-xs text-neutral-600">Applications</p>
                </div>
              </div>
            </div>
            <div className="rounded-card border border-neutral-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                  <TrendingUp size={20} />
                </span>
                <div>
                  <p className="text-2xl font-bold text-neutral-900">
                    {applications.filter((a) => a.status === "Shortlisted").length}
                  </p>
                  <p className="text-xs text-neutral-600">Shortlisted</p>
                </div>
              </div>
            </div>
            <div className="rounded-card border border-neutral-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <Bookmark size={20} />
                </span>
                <div>
                  <p className="text-2xl font-bold text-neutral-900">{savedJobs.length}</p>
                  <p className="text-xs text-neutral-600">Saved Jobs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recent Applications */}
            <section className="rounded-card border border-neutral-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-neutral-900">Recent Applications</h2>
                <Link href="/jobs" className="text-xs font-medium text-primary-600 hover:underline">
                  Browse Jobs
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                {isLoading ? (
                  <p className="text-sm text-neutral-500">Loading...</p>
                ) : applications.length === 0 ? (
                  <p className="text-sm text-neutral-500">You haven&apos;t applied to any jobs yet.</p>
                ) : (
                  applications.slice(0, 5).map((app) => (
                    <div
                      key={app._id?.toString()}
                      className="flex items-center justify-between rounded-lg border border-neutral-100 p-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{app.jobTitle}</p>
                        <p className="mt-0.5 text-xs text-neutral-500">{app.company}</p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[app.status] || "bg-neutral-100 text-neutral-600"}`}
                      >
                        {app.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Saved Jobs */}
            <section className="rounded-card border border-neutral-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-neutral-900">Saved Jobs</h2>
              </div>

              <div className="mt-4 space-y-3">
                {isLoading ? (
                  <p className="text-sm text-neutral-500">Loading...</p>
                ) : savedJobs.length === 0 ? (
                  <p className="text-sm text-neutral-500">No saved jobs yet. Bookmark jobs you like!</p>
                ) : (
                  savedJobs.slice(0, 5).map((job) => (
                    <Link
                      key={job._id?.toString()}
                      href={`/jobs/${job._id?.toString()}`}
                      className="block rounded-lg border border-neutral-100 p-3 transition-colors hover:border-primary-200 hover:bg-primary-50"
                    >
                      <p className="text-sm font-medium text-neutral-900">{job.title}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={11} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} /> {job.jobType}
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}