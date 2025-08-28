import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// GET partnership by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = parseInt(id || "");

  if (isNaN(numericId)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    const partnership = await prisma.partnership.findUnique({
      where: { id: numericId },
      include: { categoryPartnership: true },
    });

    if (!partnership) {
      return NextResponse.json(
        { message: "Partnership not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(partnership);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { message: "Failed to fetch partnership" },
      { status: 500 }
    );
  }
}

// DELETE partnership by ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = parseInt(id || "");

  if (isNaN(numericId)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.partnership.delete({
      where: { id: numericId },
    });

    return NextResponse.json({ message: "Partnership deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { message: "Failed to delete partnership" },
      { status: 500 }
    );
  }
}

// PUT (update) partnership by ID
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = parseInt(id || "");

  if (isNaN(numericId)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { name, categoryPartnershipId, image } = body;

    if (!name || !categoryPartnershipId) {
      return NextResponse.json(
        { message: "Name and categoryPartnershipId are required" },
        { status: 400 }
      );
    }

    const updatedPartnership = await prisma.partnership.update({
      where: { id: numericId },
      data: {
        name,
        categoryPartnershipId,
        image,
      },
    });

    return NextResponse.json(updatedPartnership);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { message: "Failed to update partnership" },
      { status: 500 }
    );
  }
}
