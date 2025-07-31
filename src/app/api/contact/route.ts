// coco_khmer/app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body;

  // You could save to DB or send an email here
  console.log("📩 Contact form submitted:", { name, email, message });

  return NextResponse.json({ success: true, message: "Message received!" });
}
