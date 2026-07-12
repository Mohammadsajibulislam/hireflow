import { NextRequest, NextResponse } from "next/server";
import mongoClient from "@/lib/mongodb";
import type { Filter } from "mongodb";
import type { JobDocument } from "@/types/job";

export async function GET(request: NextRequest) {
  try {
    const db = mongoClient.db();
    const searchParams = request.nextUrl.searchParams;

    // Query parameters পড়া — /api/jobs?search=react&category=development&page=1
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const jobType = searchParams.get("jobType") || "";
    const sort = searchParams.get("sort") || "latest";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 10;

    // MongoDB filter অবজেক্ট ধাপে ধাপে তৈরি করা — Requirement: "at least 2 fields" ফিল্টার
    const filter: Filter<JobDocument> = {};

    if (search) {
      // $or দিয়ে title অথবা company তে ম্যাচ খোঁজা, $regex দিয়ে case-insensitive সার্চ
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (jobType) {
      filter.jobType = jobType as JobDocument["jobType"];
    }

    // সাজানোর (sorting) নিয়ম
    const sortOption: Record<string, 1 | -1> =
      sort === "salary-high"
        ? { salaryMax: -1 }
        : sort === "salary-low"
          ? { salaryMin: 1 }
          : { createdAt: -1 }; // "latest" ডিফল্ট

    const totalJobs = await db.collection<JobDocument>("jobs").countDocuments(filter);

    const jobs = await db
      .collection<JobDocument>("jobs")
      .find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      data: jobs,
      pagination: {
        page,
        totalPages: Math.ceil(totalJobs / limit),
        totalJobs,
      },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch jobs" }, { status: 500 });
  }
}