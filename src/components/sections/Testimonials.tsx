import { Star } from "lucide-react";

interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number; // ১ থেকে ৫
  initial: string;
  avatarColor: string;
}

const testimonials: TestimonialItem[] = [
  {
    name: "Sarah Ahmed",
    role: "Frontend Developer",
    company: "Nexora",
    quote:
      "HireFlow helped me land my dream job within two weeks. The application process was smooth and the job matches were spot on.",
    rating: 5,
    initial: "S",
    avatarColor: "bg-primary-500",
  },
  {
    name: "Rakibul Islam",
    role: "Product Manager",
    company: "Orbitex",
    quote:
      "The platform is clean and easy to navigate. I could filter jobs by exactly what I needed, which saved me a lot of time.",
    rating: 5,
    initial: "R",
    avatarColor: "bg-accent-500",
  },
  {
    name: "Nusrat Jahan",
    role: "UI/UX Designer",
    company: "Havenly",
    quote:
      "As someone switching careers, HireFlow's verified companies gave me confidence that I was applying to legitimate opportunities.",
    rating: 4,
    initial: "N",
    avatarColor: "bg-orange-500",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900">What Our Users Say</h2>
          <p className="mt-2 text-neutral-600">
            Real stories from job seekers who found success with HireFlow
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col rounded-card border border-neutral-200 bg-white p-6 shadow-sm"
            >
              {/* Star rating — rating সংখ্যা অনুযায়ী ভরা/খালি তারা দেখানো */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={
                      index < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-neutral-200 text-neutral-200"
                    }
                  />
                ))}
              </div>

              <p className="mt-4 flex-1 text-sm text-neutral-600">&ldquo;{testimonial.quote}&rdquo;</p>

              <div className="mt-6 flex items-center gap-3 border-t border-neutral-200 pt-4">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${testimonial.avatarColor}`}
                >
                  {testimonial.initial}
                </span>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{testimonial.name}</p>
                  <p className="text-xs text-neutral-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}