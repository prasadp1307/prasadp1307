import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import Job from "@/models/Job";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const location = searchParams.get("location") || "";
    const type = searchParams.get("type") || "";

    const query: any = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    
    if (type) {
      query.type = type;
    }

    const jobs = await Job.find(query)
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    console.error("[GET_JOBS_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}
