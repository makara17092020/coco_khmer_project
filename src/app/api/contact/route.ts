import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" }, // newest first
    });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch contacts", error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const contact = await prisma.contact.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        message: body.message,
         isRead: false,
      },
    });
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create contact", error },
      { status: 500 }
    );
  }
}
