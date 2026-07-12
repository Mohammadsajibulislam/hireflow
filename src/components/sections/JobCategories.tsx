import Link from "next/link";
import {
  Code2,
  Palette,
  Megaphone,
  BarChart3,
  ShoppingBag,
  Headphones,
  type LucideIcon,
} from "lucide-react";

interface CategoryItem {
  icon: LucideIcon;
  name: string;
  jobCount: number;
  slug: string; // URL এ ব্যবহারের জন্য (যেমন /jobs?category=development)
}

const categories: CategoryItem[] = [
  { icon: Code2, name: "Development", jobCount: 12456, slug: "development" },
  { icon: Palette, name: "Design", jobCount: 8245, slug: "design" },
  { icon: Megaphone, name: "Marketing", jobCount: 6476, slug: "marketing" },
  { icon: BarChart3, name: "Data Science", jobCount: 4321, slug: "data-science" },
  { icon: ShoppingBag, name: "Sales", jobCount: 3987, slug: "sales" },
  { icon: Headphones, name: "Support", jobCount: 2652, slug: "support" },
];

// সংখ্যাকে "12,456" এর মতো ফরম্যাট করার জন্য ছোট্ট utility ফাংশন
function formatJobCount(count: number): string {
  return count.toLocaleString("en-US");
}

export default function JobCategories() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-neutral-900">Popular Job Categories</h2>
          <Link
            href="/jobs"
            className="text-sm font-medium text-primary-600 hover:underline"
          >
            View All Categories
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.slug}
                href={`/jobs?category=${category.slug}`}
                className="flex flex-col items-center gap-3 rounded-card border border-neutral-200 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Icon size={22} />
                </span>
                <div>
                  <p className="font-semibold text-neutral-900">{category.name}</p>
                  <p className="text-xs text-neutral-600">
                    {formatJobCount(category.jobCount)} Jobs
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}