import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { signToken, createAuthCookie } from "@/lib/auth";
import { signupSchema } from "@/lib/validations";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    await connectDB();

    const { name, email, password } = parsed.data;

    // Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Create user (password hashed via pre-save hook)
    const user: any = await User.create({ name, email, password });

    // Sign JWT
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json(
      { message: "Account created successfully", user: { name: user.name, email: user.email } },
      { status: 201 }
    );

    response.cookies.set(createAuthCookie(token));
    return response;
  } catch (error) {
    console.error("[SIGNUP ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
