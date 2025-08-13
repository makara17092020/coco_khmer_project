// /app/api/product/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // ✅ use your shared client to avoid instantiating PrismaClient multiple times

// ✅ Get single product by ID
export async function GET(
  req: NextRequest,
  context: { params: { id?: string } }
) {
  const params = await context.params; // ✅ Must await
  const id = params.id;
  const numericId = parseInt(id || "");

  if (isNaN(numericId)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: numericId },
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
    console.error("GET error:", error);
    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// ✅ Update product by ID
export async function PUT(
  req: NextRequest,
  context: { params: { id?: string } }
) {
  const params = await context.params; // ✅ Must await
  const id = params.id;
  const numericId = parseInt(id || "");

  if (isNaN(numericId)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    const { name, price, desc, images, categoryId, isTopSeller } =
      await req.json();

    if (
      !name ||
      typeof price !== "number" ||
      !desc ||
      !Array.isArray(images) ||
      images.length === 0 ||
      typeof categoryId !== "number"
    ) {
      return NextResponse.json(
        { message: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    const sanitizedImages = images.filter((img: string) => img?.trim());

    const updatedProduct = await prisma.product.update({
      where: { id: numericId },
      data: {
        name,
        price,
        desc,
        images: sanitizedImages,
        categoryId,
        isTopSeller: isTopSeller ?? false,
      },
    });

    return NextResponse.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}

// ✅ Delete product by ID
export async function DELETE(
  req: NextRequest,
  context: { params: { id?: string } }
) {
  const params = await context.params; // ✅ Must await
  const id = params.id;
  const numericId = parseInt(id || "");

  if (isNaN(numericId)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.product.delete({
      where: { id: numericId },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
