// lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt, { JwtPayload } from "jsonwebtoken";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "your-refresh-secret";

// Generate access token (short-lived, 15m)
export function generateAccessToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
}

// Generate refresh token (long-lived, 7d)
export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
}

// Verify token
export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
}
