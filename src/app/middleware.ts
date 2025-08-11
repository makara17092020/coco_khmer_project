import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'super-secret'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isApiRoute = pathname.startsWith('/api/')
  const isProtected = isApiRoute && (
    pathname.startsWith('/api/product') ||
    pathname.startsWith('/api/category') ||
    pathname.startsWith('/api/user')
  )

  if (!isProtected) return NextResponse.next()

  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse(JSON.stringify({ message: 'Missing token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    jwt.verify(token, SECRET)
    return NextResponse.next()
  } catch {
    return new NextResponse(JSON.stringify({ message: 'Invalid or expired token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const config = {
  matcher: ['/api/:path*'], // apply only to API routes
}
