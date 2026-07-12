"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase, Mail, Lock, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

// Demo credentials — submission এর সময় evaluator এই দিয়ে সহজে টেস্ট করতে পারবে
const demoAccounts = {
  candidate: { email: "candidate@hireflow.demo", password: "demo1234" },
  admin: { email: "admin@hireflow.demo", password: "demo1234" },
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("ইমেইল এবং পাসওয়ার্ড দুটোই দিতে হবে");
      return;
    }

    setIsLoading(true);

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    setIsLoading(false);

    if (signInError) {
      setError("ভুল ইমেইল অথবা পাসওয়ার্ড");
      return;
    }

    router.push("/");
    router.refresh(); // Navbar এর session state আপডেট করার জন্য (Phase পরে এটা বুঝবো)
  };

  // Demo বাটনে ক্লিক করলে ইনপুট ফিল্ড auto-fill হবে, কিন্তু লগইন সাবমিট হবে না —
  // ইউজার নিজে চোখে দেখে বুঝতে পারবে কী বসলো, তারপর নিজে Login বাটনে চাপবে
  const fillDemoCredentials = (type: keyof typeof demoAccounts) => {
    setEmail(demoAccounts[type].email);
    setPassword(demoAccounts[type].password);
    setError("");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="w-full max-w-md rounded-card border border-neutral-200 bg-white p-8 shadow-sm">
        <Link href="/" className="mx-auto flex w-fit items-center gap-2 text-xl font-bold text-neutral-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white">
            <Briefcase size={18} />
          </span>
          HireFlow
        </Link>

        <h1 className="mt-6 text-center text-2xl font-bold text-neutral-900">Welcome back</h1>
        <p className="mt-1 text-center text-sm text-neutral-600">Login to continue to your account</p>

        {/* Demo login বাটন — Requirement: "Demo login button (auto-fill credentials)" */}
        <div className="mt-6 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => fillDemoCredentials("candidate")}
            className="rounded-lg border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
          >
            Fill Candidate Demo
          </button>
          <button
            type="button"
            onClick={() => fillDemoCredentials("admin")}
            className="rounded-lg border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
          >
            Fill Admin Demo
          </button>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
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
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}