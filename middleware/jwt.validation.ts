// auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { messages } from '../_helper/messages';
import * as dotenv from "dotenv";
dotenv.config();


export function authMiddleware(   req: Request,  res: Response,  next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (token) {
    try {
      const key = process.env.SECRET_KEY ?? '';
      
      const payload:any = jwt.verify(token, key); 

      (req as any).userId = payload.userId;

      next();
    } catch (error) {
      return res.status(401).json({ message: messages.INVALID_TOKEN });
    }
  } else {
    return res.status(401).json({ message: messages.ACCESS_DENIED });
  }
}
