/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useState } from "react";
import { Search, MapPin, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import JobCard from "@/components/jobs/JobCard";
import JobCardSkeleton from "@/components/jobs/JobCardSkeleton";
import { useJobs } from "@/hooks/useJobs";

const categories = [
  { label: "All Categories", value: "" },
  { label: "Development", value: "development" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
  { label: "Data Science", value: "data-science" },
];

const jobTypes = [
  { label: "All Types", value: "" },
  { label: "Full Time", value: "Full Time" },
  { label: "Part Time", value: "Part Time" },
  { label: "Contract", value: "Contract" },
  { label: "Internship", value: "Internship" },
];

const sortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Salary: High to Low", value: "salary-high" },
  { label: "Salary: Low to High", value: "salary-low" },
];

export default function BrowseJobsPage() {
  // প্রতিটা ফিল্টারের জন্য আলাদা state — ts-checklist.md পয়েন্ট ৬ (useState)
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState(""); // এটা সত্যিকারের API কলের জন্য (debounced)
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  const { jobs, pagination, isLoading, error } = useJobs({ search, category, jobType, sort, page });

  // সার্চ ফর্ম সাবমিট হলে (Enter চাপলে বা Search বাটনে ক্লিক করলে) আসল সার্চ চালু হবে
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1); // নতুন সার্চ করলে সবসময় প্রথম পেজে ফিরে যাওয়া উচিত
  };

  const handleFilterChange = (setter: (value: string) => void, value: string) => {
    setter(value);
    setPage(1); // ফিল্টার বদলালেও প্রথম পেজে ফিরে যাওয়া
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setCategory("");
    setJobType("");
    setSort("latest");
    setPage(1);
  };

  return (
    <>
      <Navbar />
      <main className="bg-neutral-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-neutral-900">Browse Jobs</h1>
          <p className="mt-1 text-sm text-neutral-600">
            <a href="/" className="hover:text-primary-600">
              Home
            </a>{" "}
            / Jobs
          </p>

          {/* সার্চ বার */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-6 flex flex-col gap-2 rounded-card border border-neutral-200 bg-white p-2 shadow-sm sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-2 px-3 py-2">
              <Search size={18} className="text-neutral-600" />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full text-sm outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-600"
            >
              Search
            </button>
          </form>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* বাম পাশ — Filter Sidebar */}
            <aside className="lg:col-span-1">
              <div className="rounded-card border border-neutral-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 font-semibold text-neutral-900">
                    <SlidersHorizontal size={16} /> Filters
                  </h2>
                  <button onClick={clearFilters} className="text-xs font-medium text-primary-600 hover:underline">
                    Clear All
                  </button>
                </div>

                {/* Category ফিল্টার — Requirement: "at least 2 fields" এর একটা */}
                <div className="mt-5">
                  <p className="text-sm font-medium text-neutral-900">Category</p>
                  <div className="mt-2 space-y-2">
                    {categories.map((cat) => (
                      <label key={cat.value} className="flex cursor-pointer items-center gap-2 text-sm text-neutral-600">
                        <input
                          type="radio"
                          name="category"
                          checked={category === cat.value}
                          onChange={() => handleFilterChange(setCategory, cat.value)}
                          className="accent-primary-500"
                        />
                        {cat.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Job Type ফিল্টার — দ্বিতীয় ফিল্ড */}
                <div className="mt-5 border-t border-neutral-100 pt-5">
                  <p className="text-sm font-medium text-neutral-900">Job Type</p>
                  <div className="mt-2 space-y-2">
                    {jobTypes.map((type) => (
                      <label key={type.value} className="flex cursor-pointer items-center gap-2 text-sm text-neutral-600">
                        <input
                          type="radio"
                          name="jobType"
                          checked={jobType === type.value}
                          onChange={() => handleFilterChange(setJobType, type.value)}
                          className="accent-primary-500"
                        />
                        {type.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* ডান পাশ — জব লিস্ট */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-600">
                  {pagination ? `Showing ${jobs.length} of ${pagination.totalJobs} jobs` : "Loading..."}
                </p>
                <select
                  value={sort}
                  onChange={(e) => handleFilterChange(setSort, e.target.value)}
                  className="rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      Sort: {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {isLoading ? (
                  // Skeleton loader — Requirement: "Skeleton loader while data is loading"
                  Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
                ) : error ? (
                  <p className="col-span-2 text-center text-sm text-red-600">{error}</p>
                ) : jobs.length === 0 ? (
                  <p className="col-span-2 text-center text-sm text-neutral-600">
                    No jobs found matching your criteria.
                  </p>
                ) : (
                  jobs.map((job) => <JobCard key={job._id} job={job} />)
                )}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {Array.from({ length: pagination.totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`h-9 w-9 rounded-lg text-sm font-medium ${
                        page === i + 1
                          ? "bg-primary-500 text-white"
                          : "border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                    disabled={page === pagination.totalPages}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}