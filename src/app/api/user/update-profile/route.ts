import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, avatar } = body;

    // TODO: Replace this with real DB update logic!
    console.log("✅ Update profile:");
    console.log("Email:", email);
    console.log("Avatar URL:", avatar);

    // Simulate DB update delay
    // await db.user.update({ where: { email }, data: { avatarUrl: avatar } });

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("❌ Failed to update profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
