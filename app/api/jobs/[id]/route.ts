import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import Job from "@/models/Job";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    const job = await Job.findById(id)
      .populate("postedBy", "name email")
      .lean();

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    let alreadyApplied = false;
    const session = await getSession();
    if (session) {
      const Application = (await import("@/models/Application")).default;
      const application = await Application.findOne({
        jobId: id,
        userId: session.userId
      });
      alreadyApplied = !!application;
    }

    return NextResponse.json({ job, alreadyApplied }, { status: 200 });
  } catch (error) {
    console.error("[GET_JOB_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}
