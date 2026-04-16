import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import Application from "@/models/Application";
import Job from "@/models/Job";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Please login to apply" }, { status: 401 });
    }

    await connectDB();
    const { id: jobId } = await params;
    const body = await request.json();
    const { resume, coverLetter, phone } = body;

    const applicationResume = resume || coverLetter;

    if (!applicationResume) {
      return NextResponse.json({ error: "Resume or cover letter is required" }, { status: 400 });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const existingApplication = await Application.findOne({
      jobId,
      userId: session.userId,
    });

    if (existingApplication) {
      return NextResponse.json({ error: "You have already applied for this job" }, { status: 400 });
    }

    const application = await Application.create({
      jobId,
      userId: session.userId,
      userName: session.name,
      userEmail: session.email,
      resume: applicationResume,
      // Note: If you want to store phone, update the model. For now we use resume field.
    });

    return NextResponse.json(
      { message: "Application submitted successfully", application },
      { status: 201 }
    );
  } catch (error) {
    console.error("[APPLY_JOB_ERROR]", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
