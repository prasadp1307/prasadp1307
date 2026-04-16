import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import Job from "@/models/Job";
import Application from "@/models/Application";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const myJobs = await Job.find({ postedBy: session.userId })
      .sort({ createdAt: -1 })
      .lean();

    const myApplications = await Application.find({ userId: session.userId })
      .populate("jobId")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      { jobs: myJobs, applications: myApplications },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET_USER_JOBS_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
