import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ products });
  } catch (error) {
    console.error("GET /api/product error:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check for Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Missing or invalid token" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT token safely
    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { name, price, categoryId, desc, images } = body;

    // Validate required fields
    const priceNum = Number(price);
    const categoryIdNum = Number(categoryId);

    if (
      !name ||
      isNaN(priceNum) ||
      isNaN(categoryIdNum) ||
      !desc ||
      !images ||
      !Array.isArray(images)
    ) {
      return NextResponse.json(
        { message: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    // Validate images array contents
    const validImages = images.filter(
      (img: string) => typeof img === "string" && img.trim() !== ""
    );

    if (validImages.length === 0) {
      return NextResponse.json(
        { message: "Images array cannot be empty" },
        { status: 400 }
      );
    }

    // Check category existence
    const category = await prisma.category.findUnique({
      where: { id: categoryIdNum },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 400 }
      );
    }

    // Create product
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: priceNum,
        categoryId: categoryIdNum,
        desc,
        images: validImages,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/product error:", error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}
