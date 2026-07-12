import type { ObjectId } from "mongodb";

// একজন candidate যখন কোনো জব save/bookmark করে
export interface SavedJobDocument {
  _id?: ObjectId;
  userId: string;
  jobId: string;
  savedAt: Date;
}

export type ApplicationStatus = "Under Review" | "Shortlisted" | "In Progress" | "Rejected";

// একজন candidate যখন কোনো জবে apply করে
export interface ApplicationDocument {
  _id?: ObjectId;
  userId: string;
  jobId: string;
  jobTitle: string; // ডিনরমালাইজড (denormalized) — বারবার জব লুকআপ এড়াতে
  company: string;
  status: ApplicationStatus;
  appliedAt: Date;
}