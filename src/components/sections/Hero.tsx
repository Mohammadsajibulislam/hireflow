import Link from "next/link";
import { Search, MapPin, Briefcase, Building2 } from "lucide-react";

const popularSearches = ["React Developer", "UI/UX Designer", "Node.js", "Product Manager", "Data Analyst"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-10 sm:min-h-[65vh] sm:py-0 sm:flex sm:items-center">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* বাম পাশ — টেক্সট এবং সার্চ */}
        <div className="order-1">
          <h1 className="text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Find Your Dream Job
            <br />
            Build Your <span className="text-primary-500">Future</span>
          </h1>

          <p className="mt-4 max-w-md text-sm text-neutral-600 sm:text-base">
            Discover thousands of job opportunities with all the information you need. It&apos;s your future.
          </p>

          <form className="mt-6 flex flex-col gap-2 rounded-xl border border-neutral-200 bg-white p-2 shadow-sm sm:flex-row">
            <div className="flex flex-1 items-center gap-2 px-3 py-2">
              <Briefcase size={18} className="shrink-0 text-neutral-600" />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="w-full text-sm outline-none"
              />
            </div>
            <div className="hidden h-6 w-px bg-neutral-200 sm:block" />
            <div className="flex flex-1 items-center gap-2 px-3 py-2">
              <MapPin size={18} className="shrink-0 text-neutral-600" />
              <input
                type="text"
                placeholder="Location"
                className="w-full text-sm outline-none"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600"
            >
              <Search size={16} />
              Search Jobs
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-neutral-600">Popular Searches:</span>
            {popularSearches.map((term) => (
              <Link
                key={term}
                href={`/jobs?q=${encodeURIComponent(term)}`}
                className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>

        {/* ডান পাশ — ছবি এবং ভাসমান স্ট্যাট ব্যাজ */}
        <div className="relative order-2 mt-6 flex justify-center sm:mt-0">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-primary-50">
            <img
              src="/hero-image.png"
              alt="Person working on laptop"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute right-2 top-6 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-lg sm:right-4 sm:top-8 sm:gap-3 sm:px-4 sm:py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600 sm:h-9 sm:w-9">
              <Briefcase size={16} />
            </span>
            <div>
              <p className="text-xs font-bold text-neutral-900 sm:text-sm">12K+</p>
              <p className="text-[10px] text-neutral-600 sm:text-xs">Jobs Available</p>
            </div>
          </div>

          <div className="absolute bottom-6 left-2 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-lg sm:bottom-8 sm:gap-3 sm:px-4 sm:py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-50 text-accent-600 sm:h-9 sm:w-9">
              <Building2 size={16} />
            </span>
            <div>
              <p className="text-xs font-bold text-neutral-900 sm:text-sm">5K+</p>
              <p className="text-[10px] text-neutral-600 sm:text-xs">Companies Hiring</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}