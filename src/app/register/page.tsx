"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase, Mail, Lock, User, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import type { UserRole } from "@/types/user";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("candidate");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // বেসিক validation — Requirement: "Proper validation and error handling"
    if (!name || !email || !password) {
      setError("সব ফিল্ড পূরণ করা আবশ্যক");
      return;
    }
    if (password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }

    setIsLoading(true);

    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
      role, // additionalFields এ যোগ করা আমাদের কাস্টম ফিল্ড
    });

    setIsLoading(false);

    if (signUpError) {
      setError(signUpError.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      return;
    }

    router.push("/"); // সফল হলে হোমপেজে পাঠানো
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="w-full max-w-md rounded-card border border-neutral-200 bg-white p-8 shadow-sm">
        {/* লোগো */}
        <Link href="/" className="mx-auto flex w-fit items-center gap-2 text-xl font-bold text-neutral-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white">
            <Briefcase size={18} />
          </span>
          HireFlow
        </Link>

        <h1 className="mt-6 text-center text-2xl font-bold text-neutral-900">Create your account</h1>
        <p className="mt-1 text-center text-sm text-neutral-600">
          Find your dream job or hire the best talent
        </p>

        {/* Role নির্বাচন — candidate বনাম recruiter */}
        <div className="mt-6 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setRole("candidate")}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              role === "candidate"
                ? "border-primary-500 bg-primary-50 text-primary-600"
                : "border-neutral-200 text-neutral-600"
            }`}
          >
            I&apos;m a Job Seeker
          </button>
          <button
            type="button"
            onClick={() => setRole("recruiter")}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              role === "recruiter"
                ? "border-primary-500 bg-primary-50 text-primary-600"
                : "border-neutral-200 text-neutral-600"
            }`}
          >
            I&apos;m a Recruiter
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5">
            <User size={18} className="text-neutral-600" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-sm outline-none"
            />
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5">
            <Mail size={18} className="text-neutral-600" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm outline-none"
            />
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5">
            <Lock size={18} className="text-neutral-600" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-sm outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-primary-500 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}