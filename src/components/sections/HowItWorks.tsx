import { UserPlus, Search, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StepItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: StepItem[] = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Set up your professional profile and highlight your skills in minutes.",
  },
  {
    icon: Search,
    title: "Explore Opportunities",
    description: "Browse curated job listings from trusted companies that match your goals.",
  },
  {
    icon: Sparkles,
    title: "Get Hired Faster",
    description: "Apply quickly and connect with employers who are actively hiring.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-500">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl">
            Start your career journey in just three simple steps
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            HireFlow makes it easy for candidates and recruiters to connect with clarity and speed.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="rounded-card border border-neutral-200 bg-neutral-50 p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <Icon size={22} />
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary-500">
                  <span>Step {index + 1}</span>
                </div>
                <h3 className="mt-2 text-xl font-semibold text-neutral-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
