import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Missing or invalid token" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { image } = body;

    if (!image || typeof image !== "string" || image.trim() === "") {
      return NextResponse.json(
        { message: "Image is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    const newCommunity = await prisma.community.create({
      data: { image: image.trim() },
    });

    return NextResponse.json(newCommunity, { status: 201 });
  } catch (error) {
    console.error("POST /api/community/create error:", error);
    return NextResponse.json(
      { message: "Failed to create community" },
      { status: 500 }
    );
  }
}
