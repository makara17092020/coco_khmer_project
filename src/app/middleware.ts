import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'super-secret'

export function middleware(req: NextRequest) {
  const protectedPaths = ['/categories', '/products', '/users', '/dashboard']
  const path = req.nextUrl.pathname
  const token = req.cookies.get('token')?.value
  const isProtected = protectedPaths.some(route => path.startsWith(route))

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    if (token) jwt.verify(token, SECRET)
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/categories/:path*', '/products/:path*', '/users/:path*', '/dashboard/:path*'],
}
