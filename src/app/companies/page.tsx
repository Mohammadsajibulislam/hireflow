import Link from "next/link";
import { MapPin, Briefcase } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { companies } from "@/data/companies";

export default function CompaniesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-neutral-50 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-neutral-900">Companies Hiring</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Explore {companies.length} verified companies currently hiring on HireFlow
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <Link
                key={company.slug}
                href={`/companies/${company.slug}`}
                className="rounded-card border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${company.bgColor}`}
                  >
                    {company.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-semibold text-neutral-900">{company.name}</p>
                    <p className="text-xs text-neutral-600">{company.industry}</p>
                  </div>
                </div>

                <p className="mt-3 text-sm text-neutral-600 line-clamp-2">{company.description}</p>

                <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {company.location}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-primary-600">
                    <Briefcase size={12} /> {company.jobCount}+ Jobs
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}