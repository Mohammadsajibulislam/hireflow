import type { ObjectId } from "mongodb";

export type JobType = "Full Time" | "Part Time" | "Contract" | "Internship" | "Remote";
export type ExperienceLevel = "Entry Level" | "Mid Level" | "Senior Level";

export interface JobDocument {
  _id?: ObjectId; // string এর বদলে ObjectId — MongoDB এর আসল টাইপের সাথে মিলিয়ে
  title: string;
  company: string;
  companyInitial: string;
  companyColor: string;
  location: string;
  category: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedBy: string;
  createdAt: Date;
}

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