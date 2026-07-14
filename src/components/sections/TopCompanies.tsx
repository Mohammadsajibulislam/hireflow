import Link from "next/link";
import { companies } from "@/data/companies";

export default function TopCompanies() {
  return (
    <section className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-neutral-900">Top Companies Hiring</h2>
          <Link href="/companies" className="text-sm font-medium text-primary-600 hover:underline">
            View All Companies
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {companies.map((company) => (
            <Link
              key={company.slug}
              href={`/companies/${company.slug}`}
              className="flex flex-col items-center gap-3 rounded-card border border-neutral-200 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white ${company.bgColor}`}
              >
                {company.name.charAt(0)}
              </span>
              <div>
                <p className="font-semibold text-neutral-900">{company.name}</p>
                <p className="text-xs text-neutral-600">{company.jobCount}+ Jobs</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}