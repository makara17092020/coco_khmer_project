// import { NextRequest, NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'
// import bcrypt from 'bcrypt'

// const prisma = new PrismaClient()

// export async function POST(req: NextRequest) {
//   const { name, email, password } = await req.json()

//   const existingUser = await prisma.user.findUnique({
//     where: { email }
//   })

//   if (existingUser) {
//     return NextResponse.json({ message: 'Email already registered' }, { status: 409 })
//   }

//   const hashedPassword = await bcrypt.hash(password, 10)

//   const newUser = await prisma.user.create({
//     data: {
//       name,
//       email,
//       password: hashedPassword
//     }
//   })

//   return NextResponse.json({ message: 'User registered', user: newUser })
// }

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
try {
const body = await req.json();
const { name, email, password,avatar } = body;

// Validate required fields
if (!name || !email || !password) {
  return NextResponse.json(
    { message: 'Name, email, and password are required.' },
    { status: 400 }
  );
}

// Check if user already exists
const existingUser = await prisma.user.findUnique({
  where: { email },
});

if (existingUser) {
  return NextResponse.json(
    { message: 'User with this email already exists.' },
    { status: 400 }
  );
}

// Hash the password
const hashedPassword = await bcrypt.hash(password, 10);

// Create new user
const newUser = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
    avatar,
  },
});

// Return user data without password
const { password: _, ...userWithoutPassword } = newUser;

return NextResponse.json({
  message: 'User registered successfully.',
  user: userWithoutPassword,
});

} catch (error) {
console.error('Registration error:', error);
return NextResponse.json(
{ message: 'Internal Server Error' },
{ status: 500 }
);
}
}