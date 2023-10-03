import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { messages } from '../config/api.messages';
import * as dotenv from "dotenv";
import { HttpStatus } from '../config/http-status';
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const JWT_SECRET_KEY = process.env.SECRET_KEY ?? '';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(HttpStatus.FORBIDDEN).json({ message: messages.ACCESS_DENIED });
  }
  try {
    const decodedToken = verifyToken(token);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ message: messages.INVALID_TOKEN });
  }
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET_KEY) as { userId: string };
}

