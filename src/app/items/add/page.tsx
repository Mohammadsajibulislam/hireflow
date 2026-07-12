"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, AlertCircle, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import type { JobType, ExperienceLevel } from "@/types/job";

const jobTypeOptions: JobType[] = ["Full Time", "Part Time", "Contract", "Internship", "Remote"];
const experienceOptions: ExperienceLevel[] = ["Entry Level", "Mid Level", "Senior Level"];
const categoryOptions = ["development", "design", "marketing", "data-science", "sales", "support"];

export default function AddJobPage() {
  // শুধু recruiter এবং admin এই পেজে ঢুকতে পারবে — Requirement: role-based protection
  const { session, isPending } = useRequireAuth({ allowedRoles: ["recruiter", "admin"] });
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "development",
    jobType: "Full Time" as JobType,
    experienceLevel: "Mid Level" as ExperienceLevel,
    salaryMin: "",
    salaryMax: "",
    description: "",
    responsibilities: "",
    requirements: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // একটা সাধারণ handler দিয়ে সব text/select input সামলানো — বারবার আলাদা handler না লিখে
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.company || !formData.location || !formData.description) {
      setError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, postedBy: session?.user?.id }),
      });

      const json = await res.json();

      if (!json.success) {
        setError(json.error || "Failed to post job");
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/items/manage"), 1500);
    } catch {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  // session চেক হওয়ার আগে কিছু দেখাবো না — এতে সংক্ষিপ্ত মুহূর্তের জন্য ফর্ম "ফ্ল্যাশ" করা এড়ানো যায়
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
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-card border border-neutral-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 text-white">
                <Briefcase size={18} />
              </span>
              <div>
                <h1 className="text-xl font-bold text-neutral-900">Post a New Job</h1>
                <p className="text-sm text-neutral-600">Fill in the details to attract the right candidates</p>
              </div>
            </div>

            {error && (
              <div className="mt-5 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {success ? (
              <div className="mt-5 flex items-center gap-2 rounded-lg bg-accent-50 px-4 py-3 text-sm text-accent-600">
                <CheckCircle2 size={16} /> Job posted successfully! Redirecting...
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-neutral-900">Job Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      placeholder="e.g. Senior React Developer"
                      className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-neutral-900">Company Name *</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      placeholder="e.g. Nexora"
                      className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-neutral-900">Location *</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      placeholder="e.g. Remote / Dhaka"
                      className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-neutral-900">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none"
                    >
                      {categoryOptions.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-neutral-900">Job Type</label>
                    <select
                      value={formData.jobType}
                      onChange={(e) => handleChange("jobType", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none"
                    >
                      {jobTypeOptions.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-neutral-900">Experience Level</label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) => handleChange("experienceLevel", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none"
                    >
                      {experienceOptions.map((exp) => (
                        <option key={exp} value={exp}>
                          {exp}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-neutral-900">Min Salary ($)</label>
                    <input
                      type="number"
                      value={formData.salaryMin}
                      onChange={(e) => handleChange("salaryMin", e.target.value)}
                      placeholder="e.g. 60000"
                      className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-neutral-900">Max Salary ($)</label>
                    <input
                      type="number"
                      value={formData.salaryMax}
                      onChange={(e) => handleChange("salaryMax", e.target.value)}
                      placeholder="e.g. 90000"
                      className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-900">Job Description *</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Describe the role and what makes it exciting..."
                    className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-900">
                    Responsibilities <span className="text-neutral-400">(one per line)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.responsibilities}
                    onChange={(e) => handleChange("responsibilities", e.target.value)}
                    placeholder={"Build reusable components\nOptimize performance"}
                    className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-900">
                    Requirements <span className="text-neutral-400">(one per line)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => handleChange("requirements", e.target.value)}
                    placeholder={"3+ years of experience\nStrong TypeScript knowledge"}
                    className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-primary-500 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
                >
                  {isSubmitting ? "Posting..." : "Post Job"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}