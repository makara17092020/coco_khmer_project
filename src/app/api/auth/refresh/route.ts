import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "super-secret";

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = await req.json();
    if (!refreshToken)
      return NextResponse.json(
        { message: "No refresh token" },
        { status: 401 }
      );

    const payload: any = jwt.verify(refreshToken, SECRET);
    const access_token = jwt.sign(
      { id: payload.id, email: payload.email },
      SECRET,
      { expiresIn: "15m" }
    );

    return NextResponse.json({ access_token });
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 401 }
    );
  }
}
