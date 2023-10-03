import { messages } from "./api.messages";
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

export class UserNotFoundException extends ApiError {
  constructor() {    
    super(messages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    this.name = this.constructor.name;
  }
}

export class EmailAlreadyExistsException extends ApiError {
  constructor() {    
    super(messages.EMAIL_ALREADY_EXISTS, HttpStatus.CONFLICT);
    this.name = this.constructor.name;
  }
}
