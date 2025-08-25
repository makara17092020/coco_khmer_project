import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET product by ID
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const productId = parseInt(id);
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { category: true },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("GET product error:", error);
    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT update product by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const body = await req.json();
    const {
      name,
      size,
      desc,
      categoryId,
      images,
      isTopSeller,
      highLight,
      ingredient,
    } = body;

    // Validate fields
    if (
      !name?.trim() ||
      !desc?.trim() ||
      !categoryId ||
      !images ||
      !Array.isArray(images) ||
      images.length === 0 ||
      !size ||
      !Array.isArray(size) ||
      size.length === 0 ||
      !size.every((s: any) => typeof s === "string" && s.trim() !== "") ||
      !highLight ||
      !Array.isArray(highLight) ||
      highLight.length === 0 ||
      !highLight.every((h: any) => typeof h === "string" && h.trim() !== "") ||
      !ingredient ||
      !Array.isArray(ingredient) ||
      ingredient.length === 0 ||
      !ingredient.every((i: any) => typeof i === "string" && i.trim() !== "")
    ) {
      return NextResponse.json(
        { message: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    const categoryExists = await prisma.category.findUnique({
      where: { id: Number(categoryId) },
    });

    if (!categoryExists) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: name.trim(),
        size: size.map((s: string) => s.trim()), // sanitize array
        desc: desc.trim(),
        categoryId: Number(categoryId),
        images,
        isTopSeller: isTopSeller ?? false,
        highLight: highLight.map((h: string) => h.trim()),
        ingredient: ingredient.map((i: string) => i.trim()),
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    console.error("PUT /api/product/[id] error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE product by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });
    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error("DELETE product error:", error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
