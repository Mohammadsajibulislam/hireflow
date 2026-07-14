import Link from "next/link";
import { SearchX } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-neutral-50 px-4 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <SearchX size={28} />
        </span>
        <h1 className="mt-5 text-4xl font-bold text-neutral-900">404</h1>
        <p className="mt-2 text-lg font-medium text-neutral-900">Page Not Found</p>
        <p className="mt-2 max-w-md text-sm text-neutral-600">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-600"
        >
          Back to Home
        </Link>
      </main>
    </>
  );
}