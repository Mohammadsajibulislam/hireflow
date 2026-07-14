"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase, Menu, X, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import type { NavItem } from "@/types/nav";

const loggedOutLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const loggedInBaseLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  const role = session?.user?.role as "candidate" | "recruiter" | "admin" | undefined;

  // প্রতিটা role এ কমপক্ষে ৫টা রুট নিশ্চিত করা হচ্ছে (৩টা base + ২টা role-specific)
  const roleBasedLinks: NavItem[] =
    role === "recruiter"
      ? [
          { label: "Post a Job", href: "/items/add" },
          { label: "Manage Jobs", href: "/items/manage" },
        ]
      : role === "admin"
        ? [
            { label: "Admin Dashboard", href: "/admin" },
            { label: "Manage Jobs", href: "/items/manage" }, // admin এরও manage-jobs এ অ্যাক্সেস আছে (useRequireAuth এ allowedRoles তে admin আছে)
          ]
        : [
            { label: "Dashboard", href: "/dashboard" },
            { label: "Blog", href: "/blog" },
          ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-neutral-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white">
            <Briefcase size={18} />
          </span>
          HireFlow
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {(session ? loggedInBaseLinks : loggedOutLinks).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-primary-600"
            >
              {item.label}
            </Link>
          ))}
          {session &&
            roleBasedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-primary-600"
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-neutral-100" />
          ) : session ? (
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-sm font-bold text-primary-600">
                {session.user.name.charAt(0).toUpperCase()}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        <button
          className="text-neutral-900 md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {(session ? [...loggedInBaseLinks, ...roleBasedLinks] : loggedOutLinks).map((item) => (
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
              {session ? (
                <button
                  onClick={handleLogout}
                  className="rounded-lg border border-neutral-200 px-4 py-2 text-center text-sm font-medium"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/login" className="rounded-lg border border-neutral-200 px-4 py-2 text-center text-sm font-medium">
                    Login
                  </Link>
                  <Link href="/register" className="rounded-lg bg-primary-500 px-4 py-2 text-center text-sm font-medium text-white">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}