import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key"; // use .env in real app

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, avatar } = body;

    // Generate real JWT token
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

    return NextResponse.json({
      message: "Profile updated successfully",
      token,
    });
  } catch (error) {
    console.error("❌ Failed to update profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
