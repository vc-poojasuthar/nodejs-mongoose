import { messages } from "./api-messages";
import { HttpStatus } from "./http-status";

export class ApiError extends Error {
  isOperational: boolean = false;
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

export class AuthFailedException extends ApiError {
  constructor() {    
    super(messages.AUTH_FAILED, HttpStatus.UNAUTHORIZED);
    this.name = this.constructor.name;
  }
}

export class NotFoundException extends ApiError {
  constructor(public message: string) { 
    super(message, HttpStatus.NOT_FOUND);
    this.message = message;
    this.name = this.constructor.name;
  }
}

export class EmailAlreadyExistsException extends ApiError {
  constructor() {    
    super(messages.EMAIL_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
    this.name = this.constructor.name;
  }
}
