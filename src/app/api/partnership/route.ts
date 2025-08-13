import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET() {
  try {
    const partnerships = await prisma.partnership.findMany({
      include: { categoryPartnership: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ partnerships });
  } catch (error) {
    console.error("GET /api/partnership error:", error);
    return NextResponse.json(
      { message: "Failed to fetch partnerships" },
      { status: 500 }
    );
  }
}

// POST new partnership
export async function POST(req: NextRequest) {
  try {
    // Check token
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
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

    // Get request body
    const { name, image, categoryPartnership } = await req.json();

    if (!name || !image || !categoryPartnership) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create partnership
    const newPartnership = await prisma.partnership.create({
      data: { name, image, categoryPartnership },
    });

    return NextResponse.json(newPartnership, { status: 201 });
  } catch (error) {
    console.error("POST /api/partnership error:", error);
    return NextResponse.json(
      { message: "Failed to create partnership" },
      { status: 500 }
    );
  }
}
