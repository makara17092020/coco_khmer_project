/* eslint-disable @typescript-eslint/no-unused-vars */
// /middleware.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect product API
  if (!pathname.startsWith("/api/product")) return NextResponse.next();

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new NextResponse(JSON.stringify({ message: "Missing token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Invalid or expired token" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export const config = {
  matcher: ["/api/product/:path*"],
};
