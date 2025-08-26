/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// type Params = { params: { id: string } };

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const communityId = parseInt(id);

    await prisma.community.delete({
      where: { id: communityId },
    });

    return NextResponse.json({ message: "image deleted successfully ✅" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete image ❌" },
      { status: 500 }
    );
  }
}
