// src/lib/auth.ts
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secretkey123';

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

