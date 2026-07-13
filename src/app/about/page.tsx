import { Target, Users, Rocket, Heart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To connect talented professionals with companies that value their skills and ambitions.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "We build tools that put job seekers and employers on equal footing, with transparency at every step.",
  },
  {
    icon: Rocket,
    title: "Always Improving",
    description: "We continuously refine our platform based on real feedback from the people who use it every day.",
  },
  {
    icon: Heart,
    title: "People Over Metrics",
    description: "Behind every application is a person with a story. We never lose sight of that.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero */}
        <section className="bg-primary-50 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
              Helping People Find Work They <span className="text-primary-500">Love</span>
            </h1>
            <p className="mt-4 text-neutral-600">
              HireFlow was built on a simple idea: job hunting shouldn&apos;t feel like a second job.
              We&apos;re here to make the process transparent, efficient, and human.
            </p>
          </div>
        </section>

        {/* গল্প */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-neutral-900">Our Story</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              HireFlow started as a small project aimed at simplifying how job seekers discover
              opportunities and how companies find the right talent. What began as a simple listing
              page has grown into a full platform connecting thousands of candidates with verified
              employers across industries.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Today, our platform hosts thousands of active job listings, serves job seekers from
              entry-level to senior positions, and works with companies ranging from early-stage
              startups to established enterprises.
            </p>
          </div>
        </section>

        {/* মূল্যবোধ */}
        <section className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold text-neutral-900">What We Stand For</h2>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="rounded-card border border-neutral-200 bg-white p-6 text-center shadow-sm"
                  >
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <Icon size={22} />
                    </span>
                    <h3 className="mt-4 font-semibold text-neutral-900">{value.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}