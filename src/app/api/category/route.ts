import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function GET() {
  try {
    // Check if categories exist
    const categories = await prisma.category.findMany({
      orderBy: { id: "asc" },
    });

    // If no categories, create defaults
    if (categories.length === 0) {
      const defaultCategories = ["All Products", "Skin Care", "Fragrances"];
      const createdCategories = await Promise.all(
        defaultCategories.map((name) =>
          prisma.category.create({ data: { name } })
        )
      );
      return NextResponse.json(createdCategories, { status: 200 });
    }

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("GET /category error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Category name is required and must be a string" },
        { status: 400 }
      );
    }

    console.log("Creating category:", name);

    const category = await prisma.category.create({
      data: { name },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Category creation error:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
