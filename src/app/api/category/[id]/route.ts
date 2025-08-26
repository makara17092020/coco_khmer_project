/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // adjust path if needed

// interface Params {
//   params: { id: string };
// }

// GET /api/category/[id] - fetch category
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const categoryId = Number(id);
  if (isNaN(categoryId))
    return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });

  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category)
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    return NextResponse.json(category, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch category" },
      { status: 500 }
    );
  }
}

// PUT /api/category/[id] - update category name
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const categoryId = Number(id);
  if (isNaN(categoryId))
    return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });

  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== "string")
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: { name },
    });

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to update category" },
      { status: 500 }
    );
  }
}

// DELETE /api/category/[id] - reassign products and delete category
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const categoryId = Number(id);
  if (isNaN(categoryId))
    return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });

  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category)
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );

    // Reassign products to "All Products" category (assume ID = 1)
    await prisma.product.updateMany({
      where: { categoryId },
      data: { categoryId: 1 },
    });

    // Delete the category
    await prisma.category.delete({ where: { id: categoryId } });

    return NextResponse.json(
      {
        message:
          "Category deleted successfully and products reassigned to All Products",
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}
