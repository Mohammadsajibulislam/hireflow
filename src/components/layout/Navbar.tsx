"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, Menu, X } from "lucide-react";
import type { NavItem } from "@/types/nav";

// লগ-আউট অবস্থায় দেখানো লিংক (requirement: minimum 3, আমরা 6টা দিচ্ছি — মকআপ অনুযায়ী)
const loggedOutLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  // মোবাইল মেনু খোলা/বন্ধ করার state — এই জন্যই "use client" লাগলো
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // sticky top-0 → Requirement: "Sticky or fixed position", full-width background
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* লোগো */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-neutral-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white">
            <Briefcase size={18} />
          </span>
          HireFlow
        </Link>

        {/* ডেস্কটপ নেভিগেশন — মোবাইলে লুকানো থাকবে */}
        <nav className="hidden items-center gap-8 md:flex">
          {loggedOutLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-primary-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ডেস্কটপ Auth বাটন */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
          >
            Sign Up
          </Link>
        </div>

        {/* মোবাইল হ্যামবার্গার বাটন — শুধু মোবাইলে দেখাবে */}
        <button
          className="text-neutral-900 md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* মোবাইল ড্রপডাউন মেনু — শুধু isMenuOpen true হলে দেখাবে */}
      {isMenuOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {loggedOutLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-neutral-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-neutral-200 pt-4">
              <Link
                href="/login"
                className="rounded-lg border border-neutral-200 px-4 py-2 text-center text-sm font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-primary-500 px-4 py-2 text-center text-sm font-medium text-white"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}