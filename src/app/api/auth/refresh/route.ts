// /app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret";

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = await req.json();
    if (!refreshToken) {
      return NextResponse.json(
        { message: "No refresh token" },
        { status: 401 }
      );
    }

    const payload: any = jwt.verify(refreshToken, JWT_SECRET);

    // Generate new access token
    const accessToken = jwt.sign(
      { email: payload.email, role: payload.role },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    return NextResponse.json({ accessToken });
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 401 }
    );
  }
}
