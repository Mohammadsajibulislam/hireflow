export type JobType = "Full Time" | "Part Time" | "Contract" | "Internship" | "Remote";
export type ExperienceLevel = "Entry Level" | "Mid Level" | "Senior Level";

export interface JobDocument {
  _id?: string;
  title: string;
  company: string;
  companyInitial: string;
  companyColor: string;
  location: string;
  category: string; // Development, Design, Marketing ইত্যাদি
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedBy: string; // recruiter এর userId (Better-Auth session থেকে আসবে)
  createdAt: Date;
}

// Add Job ফর্ম থেকে যা আসবে (Requirement সেকশন ৮: Title, description, price/date/priority, image)
export interface CreateJobInput {
  title: string;
  company: string;
  location: string;
  category: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  description: string;
  responsibilities: string;
  requirements: string;
}