import Link from "next/link";

interface CompanyItem {
  name: string;
  slug: string;
  jobCount: number;
  bgColor: string; // প্রতিটা কোম্পানির নিজস্ব ব্র্যান্ড কালার (initial এর ব্যাকগ্রাউন্ড)
}

const companies: CompanyItem[] = [
  { name: "Nexora", slug: "nexora", jobCount: 120, bgColor: "bg-blue-500" },
  { name: "Bytewise", slug: "bytewise", jobCount: 95, bgColor: "bg-emerald-500" },
  { name: "Soundify", slug: "soundify", jobCount: 80, bgColor: "bg-green-500" },
  { name: "Orbitex", slug: "orbitex", jobCount: 150, bgColor: "bg-orange-500" },
  { name: "Voltra", slug: "voltra", jobCount: 60, bgColor: "bg-red-500" },
  { name: "Havenly", slug: "havenly", jobCount: 70, bgColor: "bg-pink-500" },
];

export default function TopCompanies() {
  return (
    <section className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-neutral-900">Top Companies Hiring</h2>
          <Link
            href="/companies"
            className="text-sm font-medium text-primary-600 hover:underline"
          >
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
              {/* কোম্পানির প্রথম অক্ষর দিয়ে একটা রঙিন বৃত্তাকার ব্যাজ */}
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