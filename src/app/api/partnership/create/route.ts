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
    return NextResponse.json(partnerships);
  } catch (err) {
    console.error("GET /partnership/create error:", err);
    return NextResponse.json(
      { message: "Failed to fetch partnerships" },
      { status: 500 }
    );
  }
}

// POST new partnership
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    console.log("Auth Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Missing or invalid token" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      email: string;
    };
    console.log("Decoded token:", decoded);

    const body = await req.json();
    const { name, image, categoryPartnershipId } = body;

    if (!name || !image || !categoryPartnershipId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const category = await prisma.categoryPartnership.findUnique({
      where: { id: Number(categoryPartnershipId) },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 400 }
      );
    }

    const newPartnership = await prisma.partnership.create({
      data: {
        name,
        image,
        categoryPartnership: {
          connect: { id: Number(categoryPartnershipId) },
        },
      },
      include: { categoryPartnership: true },
    });

    return NextResponse.json(newPartnership, { status: 201 });
  } catch (err: any) {
    console.error("POST /partnership/create error:", err);
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { message: "Failed to create partnership" },
      { status: 500 }
    );
  }
}
