import { Briefcase, Building2, Users, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { icon: Briefcase, value: "38K+", label: "Active Jobs" },
  { icon: Building2, value: "5K+", label: "Companies" },
  { icon: Users, value: "120K+", label: "Job Seekers" },
  { icon: CheckCircle2, value: "24K+", label: "Successful Hires" },
];

export default function Statistics() {
  return (
    // primary কালারের গাঢ় ব্যাকগ্রাউন্ড দিয়ে এই সেকশনকে আলাদাভাবে হাইলাইট করা হচ্ছে
    <section className="bg-primary-600 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-center text-center text-white">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <Icon size={24} />
                </span>
                <p className="mt-3 text-3xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm text-primary-100">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}