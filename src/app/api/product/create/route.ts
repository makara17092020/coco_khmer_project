import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// ✅ POST create a new product
export async function POST(req: NextRequest) {
  try {
    // --- Check JWT Token ---
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Missing or invalid token" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    let decoded: { id: number; email: string };
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // --- Parse Request Body ---
    const body = await req.json();
    const {
      name,
      size,
      categoryId,
      desc,
      images,
      isTopSeller,
      highLight,
      ingredient,
    } = body;

    // --- Validate Required Fields ---
    if (!size || !Array.isArray(size) || size.length === 0) {
      return NextResponse.json(
        { message: "Missing or invalid size field" },
        { status: 400 }
      );
    }

    // --- Validate Size ---
    if (!name || !size.length || !categoryId || !desc || !images?.length) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // --- Validate Category ---
    const category = await prisma.category.findUnique({
      where: { id: Number(categoryId) },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 400 }
      );
    }

    // --- Validate Images ---
    const validImages = images.filter(
      (img: string) => typeof img === "string" && img.trim() !== ""
    );
    if (!validImages.length) {
      return NextResponse.json(
        { message: "Images array cannot be empty" },
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        size,
        categoryId: Number(categoryId),
        desc,
        highLight,
        ingredient,
        images: validImages,
        isTopSeller: Boolean(isTopSeller) || false,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    console.error("POST /product/create error:", err);
    return NextResponse.json(
      { message: "Failed to create product", error: String(err) },
      { status: 500 }
    );
  }
}
