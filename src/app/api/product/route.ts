import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST: Create a new product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, price, desc, images, categoryId } = body;

    // Validate required fields
    if (!name || !price || !desc || !images?.length || !categoryId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create product
    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        desc,
        images,
        categoryId,
      },
    });

    return NextResponse.json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("POST /api/product error:", error);
    return NextResponse.json(
      {
        message: "Failed to create product",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// GET: Fetch all products with category info
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("GET /api/product error:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch products",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
