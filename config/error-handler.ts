import { Request, Response, NextFunction } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { HttpStatus } from './http-status';
import { messages } from './api.messages';

// Middleware for handling errors globally
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof TokenExpiredError) {
    return res.status(HttpStatus.UNAUTHORIZED).send({ message: messages.TOKEN_EXPIRED });
  }
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: messages.COMMON_ERR });
}