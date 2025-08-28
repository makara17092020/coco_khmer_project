// src/app/api/community/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// Helper to parse ID from URL
const getIdFromUrl = (req: NextRequest) => {
  const pathname = new URL(req.url).pathname;
  const parts = pathname.split("/");
  const idStr = parts[parts.length - 1]; // last segment
  const id = parseInt(idStr, 10);
  if (isNaN(id)) throw new Error("Invalid community ID");
  return id;
};

// GET /api/community/[id]
export async function GET(req: NextRequest) {
  try {
    const id = getIdFromUrl(req);
    const community = await prisma.community.findUnique({ where: { id } });

    if (!community) {
      return NextResponse.json(
        { message: "Community not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(community);
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}

// PUT /api/community/[id]
export async function PUT(req: NextRequest) {
  try {
    const id = getIdFromUrl(req);
    const body = (await req.json()) as { image?: string };

    if (!body.image) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    const updated = await prisma.community.update({
      where: { id },
      data: { image: body.image },
    });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}

// DELETE /api/community/[id]
export async function DELETE(req: NextRequest) {
  try {
    const id = getIdFromUrl(req);
    await prisma.community.delete({ where: { id } });
    return NextResponse.json({ message: "Community deleted successfully" });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}
