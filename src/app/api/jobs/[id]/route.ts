import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import mongoClient from "@/lib/mongodb";
import type { JobDocument } from "@/types/job";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid job ID" }, { status: 400 });
    }

    const db = mongoClient.db();
    const job = await db.collection<JobDocument>("jobs").findOne({ _id: new ObjectId(id) });

    if (!job) {
      return NextResponse.json({ success: false, error: "Job not found" }, { status: 404 });
    }

    const relatedJobs = await db
      .collection<JobDocument>("jobs")
      .find({ category: job.category, _id: { $ne: job._id } })
      .limit(3)
      .toArray();

    return NextResponse.json({ success: true, data: job, related: relatedJobs });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch job" }, { status: 500 });
  }
}