import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  const categoryId = Number(params.id);
  if (isNaN(categoryId))
    return NextResponse.json(
      { error: "Invalid category partnership ID" },
      { status: 400 }
    );

  try {
    const categoryPartnership = await prisma.categoryPartnership.findUnique({
      where: { id: categoryId },
    });
    if (!categoryPartnership)
      return NextResponse.json(
        { error: "Category partnership not found" },
        { status: 404 }
      );
    return NextResponse.json(categoryPartnership, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch category partnership" },
      { status: 500 }
    );
  }
}
export async function PUT(req: NextRequest, { params }: Params) {
  const categoryId = Number(params.id);
  if (isNaN(categoryId))
    return NextResponse.json(
      { error: "Invalid category partnership ID" },
      { status: 400 }
    );

  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string")
      return NextResponse.json(
        { error: "Category partnership name is required" },
        { status: 400 }
      );

    const updatedCategory = await prisma.categoryPartnership.update({
      where: { id: categoryId },
      data: { name },
    });

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to update category partnership" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const categoryId = Number(params.id);
  if (isNaN(categoryId))
    return NextResponse.json(
      { error: "Invalid category partnership ID" },
      { status: 400 }
    );

  try {
    const categoryPartnership = await prisma.categoryPartnership.findUnique({
      where: { id: categoryId },
    });
    if (!categoryPartnership)
      return NextResponse.json(
        { error: "Category partnership not found" },
        { status: 404 }
      );

    await prisma.partnership.updateMany({
      where: { categoryPartnershipId: categoryId },
      data: { categoryPartnershipId: 1 },
    });

    await prisma.categoryPartnership.delete({ where: { id: categoryId } });

    return NextResponse.json(
      {
        message:
          "Category partnership deleted successfully and partnerships reassigned to All Partnerships",
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to delete category partnership" },
      { status: 500 }
    );
  }
}
