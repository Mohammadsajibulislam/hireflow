import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import JobCategories from "@/components/sections/JobCategories";
import TopCompanies from "@/components/sections/TopCompanies";
import Statistics from "@/components/sections/Statistics";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <JobCategories />
      <TopCompanies />
      <Statistics />
      <Testimonials />
      <Newsletter />
    </main>
  );
}