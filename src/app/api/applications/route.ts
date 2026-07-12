import { NextRequest, NextResponse } from "next/server";
import mongoClient from "@/lib/mongodb";
import type { ApplicationDocument } from "@/types/activity";

// একজন ইউজারের সব application আনা
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ success: false, error: "userId is required" }, { status: 400 });
    }

    const db = mongoClient.db();
    const applications = await db
      .collection<ApplicationDocument>("applications")
      .find({ userId })
      .sort({ appliedAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch applications" }, { status: 500 });
  }
}

// নতুন application তৈরি করা (Apply Now বাটনে ক্লিক করলে)
export async function POST(request: NextRequest) {
  try {
    const { userId, jobId, jobTitle, company } = await request.json();

    if (!userId || !jobId) {
      return NextResponse.json({ success: false, error: "userId and jobId are required" }, { status: 400 });
    }

    const db = mongoClient.db();

    // একই জবে দুইবার apply করা আটকানো
    const existing = await db.collection("applications").findOne({ userId, jobId });
    if (existing) {
      return NextResponse.json({ success: false, error: "You have already applied to this job" }, { status: 409 });
    }

    const newApplication: Omit<ApplicationDocument, "_id"> = {
      userId,
      jobId,
      jobTitle,
      company,
      status: "Under Review", // সব নতুন application ডিফল্টভাবে এই স্ট্যাটাসে শুরু হয়
      appliedAt: new Date(),
    };

    await db.collection("applications").insertOne(newApplication);

    return NextResponse.json({ success: true, data: newApplication }, { status: 201 });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json({ success: false, error: "Failed to apply" }, { status: 500 });
  }
}