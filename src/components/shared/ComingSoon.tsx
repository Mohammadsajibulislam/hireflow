import Link from "next/link";
import { Construction } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

interface ComingSoonProps {
  title: string;
  description: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-neutral-50 px-4 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
          <Construction size={28} />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-neutral-900">{title}</h1>
        <p className="mt-2 max-w-md text-sm text-neutral-600">{description}</p>
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