// /app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check credentials against env
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate short-lived access token
    const accessToken = jwt.sign({ email, role: "ADMIN" }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Generate long-lived refresh token
    const refreshToken = jwt.sign({ email, role: "ADMIN" }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return NextResponse.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: { email, role: "ADMIN" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
