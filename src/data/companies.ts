export interface CompanyItem {
  name: string;
  slug: string;
  jobCount: number;
  bgColor: string;
  industry: string;
  location: string;
  description: string;
}

export const companies: CompanyItem[] = [
  {
    name: "Nexora",
    slug: "nexora",
    jobCount: 120,
    bgColor: "bg-blue-500",
    industry: "Software Development",
    location: "San Francisco, USA",
    description:
      "Nexora builds developer tools used by thousands of engineering teams worldwide, focusing on performance and developer experience.",
  },
  {
    name: "Bytewise",
    slug: "bytewise",
    jobCount: 95,
    bgColor: "bg-emerald-500",
    industry: "Cloud Infrastructure",
    location: "Austin, USA",
    description:
      "Bytewise provides cloud infrastructure and hosting solutions for startups scaling from zero to millions of users.",
  },
  {
    name: "Soundify",
    slug: "soundify",
    jobCount: 80,
    bgColor: "bg-green-500",
    industry: "Music & Entertainment",
    location: "New York, USA",
    description:
      "Soundify is a music streaming platform connecting independent artists directly with listeners around the world.",
  },
  {
    name: "Orbitex",
    slug: "orbitex",
    jobCount: 150,
    bgColor: "bg-orange-500",
    industry: "E-commerce",
    location: "Seattle, USA",
    description:
      "Orbitex operates a global e-commerce marketplace, helping small businesses reach customers across borders.",
  },
  {
    name: "Voltra",
    slug: "voltra",
    jobCount: 60,
    bgColor: "bg-red-500",
    industry: "Clean Energy",
    location: "Berlin, Germany",
    description:
      "Voltra designs smart energy management systems for residential and commercial buildings, reducing carbon footprints.",
  },
  {
    name: "Havenly",
    slug: "havenly",
    jobCount: 70,
    bgColor: "bg-pink-500",
    industry: "Real Estate",
    location: "London, UK",
    description:
      "Havenly is a proptech company reimagining how people search for, finance, and move into their next home.",
  },
];