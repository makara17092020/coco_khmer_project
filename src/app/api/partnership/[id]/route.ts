import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: { id?: string } }
) {
  const params = await context.params;
  const id = params.id;
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

export async function DELETE(
  req: NextRequest,
  context: { params: { id?: string } }
) {
  const params = await context.params;
  const id = params.id;
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
