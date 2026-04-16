import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { signToken, createAuthCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";
import User, { IUser } from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    await connectDB();

    const { email, password } = parsed.data;

    // Find user with password field
    const user = await User.findOne({ email }).select("+password") as IUser & { _id: { toString(): string } };
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json(
      { message: "Login successful", user: { name: user.name, email: user.email } },
      { status: 200 }
    );

    response.cookies.set(createAuthCookie(token));
    return response;
  } catch (error) {
    console.error("[LOGIN ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
