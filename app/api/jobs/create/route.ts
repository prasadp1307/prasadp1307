import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import Job from "@/models/Job";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    const { title, company, description, salary, location, type, requirements } = body;

    if (!title || !company || !description || !salary || !location) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const job = await Job.create({
      title,
      company,
      description,
      salary,
      location,
      type: type || "full-time",
      requirements: requirements || [],
      postedBy: session.userId,
    });

    return NextResponse.json(
      { message: "Job created successfully", job },
      { status: 201 }
    );
  } catch (error) {
    console.error("[CREATE_JOB_ERROR]", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}
