"use client";

import { useState, type FormEvent } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return;

    // এখানে পরে (Phase 3+) আসল API কল বসবে — এখন শুধু UI স্টেট দেখানো হচ্ছে
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <section className="bg-primary-50 py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white">
          <Mail size={24} />
        </span>

        <h2 className="mt-5 text-2xl font-bold text-neutral-900 sm:text-3xl">
          Never Miss a Job Opportunity
        </h2>
        <p className="mt-2 text-neutral-600">
          Subscribe to our newsletter and get the latest job openings delivered straight to your inbox.
        </p>

        {isSubscribed ? (
          // সাবস্ক্রাইব সফল হলে confirmation দেখানো — Requirement: proper feedback for actions
          <div className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-accent-50 px-4 py-3 text-sm font-medium text-accent-600">
            <CheckCircle2 size={18} />
            Thanks for subscribing! Check your inbox soon.
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-primary-500"
            />
            <button
              type="submit"
              className="rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}