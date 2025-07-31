import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PATH = "/admin";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const isAdminPath = request.nextUrl.pathname.startsWith(ADMIN_PATH);

  if (isAdminPath) {
    // If no token or not admin, redirect to login
    if (!token?.isAdmin) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
