import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import mongoClient from "@/lib/mongodb";

export async function GET() {
  try {
    // সার্ভার-সাইড role check — শুধু admin এই ডেটা দেখতে পারবে (Authorization, শুধু Navbar UI hide করাই যথেষ্ট না)
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const db = mongoClient.db();

    const totalUsers = await db.collection("user").countDocuments();
    const totalJobs = await db.collection("jobs").countDocuments();
    const totalApplications = await db.collection("applications").countDocuments();
    const companies = await db.collection("jobs").distinct("company");
    const totalCompanies = companies.length;

    // Application status অনুযায়ী গ্রুপ করা — Pie chart এর জন্য
    const statusAggregation = await db
      .collection("applications")
      .aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }])
      .toArray();

    const applicationsByStatus = statusAggregation.map((s) => ({
      name: s._id as string,
      value: s.count as number,
    }));

    // গত ৬ মাসের application সংখ্যা মাস অনুযায়ী — Line chart এর জন্য
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyAggregation = await db
      .collection("applications")
      .aggregate([
        { $match: { appliedAt: { $gte: sixMonthsAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$appliedAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    const applicationsOverview = monthlyAggregation.map((m) => ({
      month: m._id as string,
      applications: m.count as number,
    }));

    // সাম্প্রতিক ৫টা জব পোস্টিং, প্রতিটার application সংখ্যাসহ
    const recentJobsRaw = await db
      .collection("jobs")
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    const recentJobs = await Promise.all(
      recentJobsRaw.map(async (job) => {
        const applicationCount = await db
          .collection("applications")
          .countDocuments({ jobId: job._id.toString() });
        return {
          _id: job._id.toString(),
          title: job.title,
          company: job.company,
          applications: applicationCount,
          postedAt: job.createdAt,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalJobs,
        totalCompanies,
        totalApplications,
        applicationsByStatus,
        applicationsOverview,
        recentJobs,
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 });
  }
}