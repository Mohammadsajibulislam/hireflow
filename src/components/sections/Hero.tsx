import Link from "next/link";
import { Search, MapPin, Briefcase, Building2 } from "lucide-react";

// মকআপে দেখা "12K+ Jobs Available" আর "5K+ Companies Hiring" ব্যাজের ডেটা
const popularSearches = ["React Developer", "UI/UX Designer", "Node.js", "Product Manager", "Data Analyst"];

export default function Hero() {
  return (
    // height: 60-70% of screen → h-[65vh] দিয়ে সেটা মেনে চলা হচ্ছে (Requirement অনুযায়ী)
    <section className="relative flex min-h-[65vh] items-center overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* বাম পাশ — টেক্সট এবং সার্চ */}
        <div>
          <h1 className="text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl">
            Find Your Dream Job
            <br />
            Build Your <span className="text-primary-500">Future</span>
          </h1>

          <p className="mt-4 max-w-md text-neutral-600">
            Discover thousands of job opportunities with all the information you need. It&apos;s your future.
          </p>

          {/* সার্চ বার — Interactive element (CTA) */}
          <form className="mt-6 flex flex-col gap-2 rounded-xl border border-neutral-200 bg-white p-2 shadow-sm sm:flex-row">
            <div className="flex flex-1 items-center gap-2 px-3 py-2">
              <Briefcase size={18} className="text-neutral-600" />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="w-full text-sm outline-none"
              />
            </div>
            <div className="hidden h-6 w-px bg-neutral-200 sm:block" />
            <div className="flex flex-1 items-center gap-2 px-3 py-2">
              <MapPin size={18} className="text-neutral-600" />
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

          {/* Popular Searches */}
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
        <div className="relative flex justify-center">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-primary-50">
            {/* এখানে আসল ছবি বসবে — উদাহরণ হিসেবে placeholder */}
            <img
              src="/hero-image.jpg"
              alt="Person working on laptop"
              className="h-full w-full object-cover"
            />
          </div>

          {/* ভাসমান ব্যাজ ১ — 12K+ Jobs Available */}
          <div className="absolute right-4 top-8 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              <Briefcase size={18} />
            </span>
            <div>
              <p className="text-sm font-bold text-neutral-900">12K+</p>
              <p className="text-xs text-neutral-600">Jobs Available</p>
            </div>
          </div>

          {/* ভাসমান ব্যাজ ২ — 5K+ Companies Hiring */}
          <div className="absolute bottom-8 left-2 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
              <Building2 size={18} />
            </span>
            <div>
              <p className="text-sm font-bold text-neutral-900">5K+</p>
              <p className="text-xs text-neutral-600">Companies Hiring</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}