import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import mongoClient from "@/lib/mongodb";
import type { SavedJobDocument } from "@/types/activity";
import type { JobDocument } from "@/types/job";

// একজন ইউজারের সব saved job আনা (job এর পুরো তথ্যসহ)
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ success: false, error: "userId is required" }, { status: 400 });
    }

    const db = mongoClient.db();
    const savedRecords = await db
      .collection<SavedJobDocument>("savedJobs")
      .find({ userId })
      .sort({ savedAt: -1 })
      .toArray();

    // saved job গুলোর জব আইডি বের করে, সেই জবগুলোর পুরো তথ্য একসাথে আনা ($in operator দিয়ে)
    const jobIds = savedRecords.map((s) => new ObjectId(s.jobId));
    const jobs = await db
      .collection<JobDocument>("jobs")
      .find({ _id: { $in: jobIds } })
      .toArray();

    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch saved jobs" }, { status: 500 });
  }
}

// একটা জব save/toggle করা (save করা থাকলে unsave, না থাকলে save)
export async function POST(request: NextRequest) {
  try {
    const { userId, jobId } = await request.json();

    if (!userId || !jobId) {
      return NextResponse.json({ success: false, error: "userId and jobId are required" }, { status: 400 });
    }

    const db = mongoClient.db();
    const existing = await db.collection<SavedJobDocument>("savedJobs").findOne({ userId, jobId });

    if (existing) {
      await db.collection("savedJobs").deleteOne({ _id: existing._id });
      return NextResponse.json({ success: true, saved: false });
    }

    await db.collection("savedJobs").insertOne({ userId, jobId, savedAt: new Date() });
    return NextResponse.json({ success: true, saved: true });
  } catch (error) {
    console.error("Error toggling saved job:", error);
    return NextResponse.json({ success: false, error: "Failed to save job" }, { status: 500 });
  }
}