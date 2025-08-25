import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

type Params = { params: { id: string } };

const prisma = new PrismaClient();

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const communityId = parseInt(params.id);

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
