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
    const contactId = parseInt(id);

    await prisma.contact.delete({
      where: { id: contactId },
    });

    return NextResponse.json({ message: "Contact deleted successfully ✅" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete contact " },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { isRead } = body;

    const updated = await prisma.contact.update({
      where: { id: Number(id) },
      data: { isRead },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}
