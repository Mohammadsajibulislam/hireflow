import { Compass, ShieldCheck, FileCheck2, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// প্রতিটা ফিচার কার্ডের গঠন — আলাদা করে টাইপ ডিফাইন করা (ts-checklist.md পয়েন্ট ১৯: Interfaces)
interface FeatureItem {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

// ডেটা এবং UI আলাদা রাখা — Navbar/Hero তে যেই প্যাটার্ন অনুসরণ করেছিলাম, সেটাই এখানেও
const features: FeatureItem[] = [
  {
    icon: Compass,
    iconBg: "bg-primary-50",
    iconColor: "text-primary-600",
    title: "Wide Opportunities",
    description: "Explore thousands of job listings from top companies.",
  },
  {
    icon: ShieldCheck,
    iconBg: "bg-accent-50",
    iconColor: "text-accent-600",
    title: "Verified Companies",
    description: "All companies are verified and trusted by us.",
  },
  {
    icon: FileCheck2,
    iconBg: "bg-primary-50",
    iconColor: "text-primary-600",
    title: "Easy Application",
    description: "Apply to jobs in one click with your profile.",
  },
  {
    icon: TrendingUp,
    iconBg: "bg-accent-50",
    iconColor: "text-accent-600",
    title: "Career Growth",
    description: "Find the right opportunities to grow your career.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-neutral-900">
          Why Choose <span className="text-primary-500">HireFlow</span>?
        </h2>

        {/* ৪টা কার্ড — সমান height/width, একই border-radius (Global UI Rule) */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon; // Component কে variable এ রেখে JSX এ ব্যবহার করা
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center rounded-card border border-neutral-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${feature.iconBg} ${feature.iconColor}`}
                >
                  <Icon size={24} />
                </span>
                <h3 className="mt-4 font-semibold text-neutral-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}