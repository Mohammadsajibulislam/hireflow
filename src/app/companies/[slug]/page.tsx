import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Briefcase, Building2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { companies } from "@/data/companies";

interface CompanyDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CompanyDetailsPage({ params }: CompanyDetailsPageProps) {
  const { slug } = await params;
  const company = companies.find((c) => c.slug === slug);

  // Requirement এর কোথাও বলা নেই, কিন্তু ভুল slug দিলে ভদ্রভাবে হ্যান্ডেল করা উচিত
  if (!company) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="bg-neutral-50 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-card border border-neutral-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <span
                className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-3xl font-bold text-white ${company.bgColor}`}
              >
                {company.name.charAt(0)}
              </span>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">{company.name}</h1>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-sm text-neutral-600 sm:justify-start">
                  <span className="flex items-center gap-1">
                    <Building2 size={14} /> {company.industry}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {company.location}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-neutral-600">{company.description}</p>

            <div className="mt-6 flex items-center justify-between rounded-lg bg-primary-50 px-5 py-4">
              <div className="flex items-center gap-2 text-primary-700">
                <Briefcase size={18} />
                <span className="font-semibold">{company.jobCount}+ Open Positions</span>
              </div>
              <Link
                href={`/jobs?search=${encodeURIComponent(company.name)}`}
                className="rounded-lg bg-primary-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
              >
                View Jobs
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}