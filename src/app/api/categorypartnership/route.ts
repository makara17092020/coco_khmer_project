import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.categoryPartnership.findMany({
      orderBy: { id: "asc" },
    });
    if (categories.length === 0) {
      const defaultCategories = ["Mart", "Pharmacy"];
      const createdCategories = await Promise.all(
        defaultCategories.map((name) =>
          prisma.categoryPartnership.create({ data: { name } })
        )
      );
      return NextResponse.json(createdCategories, { status: 200 });
    }

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("GET /categorypartnership error:", error);
    return NextResponse.json(
      { error: "Failed to fetch category partnerships" },
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

    console.log("Creating category partnership:", name);

    const category = await prisma.categoryPartnership.create({
      data: { name },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("CategoryPartnership creation error:", error);
    return NextResponse.json(
      { error: "Failed to create category partnership" },
      { status: 500 }
    );
  }
}
