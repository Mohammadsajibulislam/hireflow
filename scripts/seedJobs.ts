import "dotenv/config";
import mongoClient from "../src/lib/mongodb";
import type { JobDocument } from "../src/types/job";

const sampleJobs: Omit<JobDocument, "_id">[] = [
  {
    title: "Senior React Developer",
    company: "Nexora",
    companyInitial: "N",
    companyColor: "bg-blue-500",
    location: "Remote",
    category: "development",
    jobType: "Full Time",
    experienceLevel: "Senior Level",
    salaryMin: 80000,
    salaryMax: 120000,
    description:
      "We are looking for a Senior React Developer to join our dynamic team and build amazing products that impact millions of users worldwide.",
    responsibilities: [
      "Build reusable components and front-end libraries for future use",
      "Translate designs and wireframes into high quality code",
      "Optimize components for maximum performance",
    ],
    requirements: [
      "3+ years of experience with React.js",
      "Strong knowledge of JavaScript, TypeScript, HTML, CSS",
      "Experience with state management (Redux, Zustand, etc.)",
    ],
    postedBy: "seed-script",
    createdAt: new Date(),
  },
  {
    title: "UI/UX Designer",
    company: "Bytewise",
    companyInitial: "B",
    companyColor: "bg-emerald-500",
    location: "New York, USA",
    category: "design",
    jobType: "Full Time",
    experienceLevel: "Mid Level",
    salaryMin: 60000,
    salaryMax: 90000,
    description:
      "Join our design team to craft delightful user experiences for our growing suite of products.",
    responsibilities: [
      "Design intuitive user interfaces",
      "Conduct user research and usability testing",
      "Collaborate closely with engineering teams",
    ],
    requirements: [
      "2+ years of UI/UX design experience",
      "Proficiency in Figma",
      "Strong portfolio showcasing design process",
    ],
    postedBy: "seed-script",
    createdAt: new Date(),
  },
  {
    title: "Node.js Developer",
    company: "Orbitex",
    companyInitial: "O",
    companyColor: "bg-orange-500",
    location: "Remote",
    category: "development",
    jobType: "Full Time",
    experienceLevel: "Mid Level",
    salaryMin: 70000,
    salaryMax: 110000,
    description:
      "We're seeking a backend engineer to help scale our API infrastructure serving millions of requests daily.",
    responsibilities: [
      "Design and maintain RESTful APIs",
      "Optimize database queries and performance",
      "Write comprehensive tests",
    ],
    requirements: [
      "3+ years experience with Node.js",
      "Strong understanding of MongoDB or similar databases",
      "Experience with microservices architecture",
    ],
    postedBy: "seed-script",
    createdAt: new Date(),
  },
  {
    title: "Product Manager",
    company: "Voltra",
    companyInitial: "V",
    companyColor: "bg-red-500",
    location: "Seattle, USA",
    category: "marketing",
    jobType: "Full Time",
    experienceLevel: "Senior Level",
    salaryMin: 100000,
    salaryMax: 150000,
    description:
      "Lead product strategy and execution for our flagship platform, working cross-functionally with design and engineering.",
    responsibilities: [
      "Define product roadmap and priorities",
      "Gather and analyze user feedback",
      "Work closely with engineering and design teams",
    ],
    requirements: [
      "4+ years of product management experience",
      "Strong analytical and communication skills",
      "Experience with agile methodologies",
    ],
    postedBy: "seed-script",
    createdAt: new Date(),
  },
  {
    title: "Frontend Developer",
    company: "Havenly",
    companyInitial: "H",
    companyColor: "bg-pink-500",
    location: "Remote",
    category: "development",
    jobType: "Contract",
    experienceLevel: "Entry Level",
    salaryMin: 55000,
    salaryMax: 89000,
    description:
      "Great opportunity for an early-career developer to grow their skills working on real-world projects.",
    responsibilities: [
      "Implement responsive web pages from Figma designs",
      "Fix bugs and improve existing codebase",
      "Participate in code reviews",
    ],
    requirements: [
      "1+ years experience with React or Vue",
      "Basic understanding of TypeScript",
      "Eagerness to learn and grow",
    ],
    postedBy: "seed-script",
    createdAt: new Date(),
  },
  {
    title: "Data Analyst",
    company: "Soundify",
    companyInitial: "S",
    companyColor: "bg-green-500",
    location: "London, UK",
    category: "data-science",
    jobType: "Full Time",
    experienceLevel: "Mid Level",
    salaryMin: 65000,
    salaryMax: 95000,
    description:
      "Help us turn data into actionable insights that drive product and business decisions.",
    responsibilities: [
      "Build dashboards and reports",
      "Analyze user behavior data",
      "Present findings to stakeholders",
    ],
    requirements: [
      "2+ years experience in data analysis",
      "Proficiency in SQL and Python",
      "Experience with visualization tools (Tableau, PowerBI)",
    ],
    postedBy: "seed-script",
    createdAt: new Date(),
  },
];

async function seedJobs() {
  try {
    const db = mongoClient.db();
    const result = await db.collection("jobs").insertMany(sampleJobs);
    console.log(`✅ ${result.insertedCount} jobs seeded successfully`);
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoClient.close();
    process.exit(0);
  }
}

seedJobs();