import { Request, Response, NextFunction } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { HttpStatus } from './http-status';
import { messages } from './api.messages';
import { ApiError } from './custom-exceptions';

// Middleware for handling errors globally
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.name, message: err.message, status: false, statusCode: err.statusCode });
  }
  if (err instanceof TokenExpiredError) {
    return res.status(HttpStatus.UNAUTHORIZED).send({ error: err.name, message: messages.TOKEN_EXPIRED, status: false, statusCode: HttpStatus.UNAUTHORIZED });
  }
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    error: err.message,
    message: messages.COMMON_ERR,
    status: false,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR
  });
}