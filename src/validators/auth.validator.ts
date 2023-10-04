import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { messages } from '../config/api-messages';
import { HttpStatus } from '../config/http-status';

const emailMessages = {
  'string.empty': messages.EMAIL_REQUIRED,
  'any.required': messages.EMAIL_REQUIRED,
  'string.email': messages.EMAIL_INVALID
};

const passwordMessages = {
  'string.empty': messages.PASSWORD_REQUIRED,
  'any.required': messages.PASSWORD_REQUIRED,
  'string.length': messages.PASSWORD_LENGTH
};
const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages(emailMessages),
  password: Joi.string().required().min(6).messages(passwordMessages),
});

function validateLoginUser(req: Request, res: Response, next: NextFunction) {
  const { error } = loginUserSchema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: error.message, error: error.details });
  } else {
    next();
  }
}

const registerUserSchema = Joi.object({
  email: Joi.string().email().required().messages(emailMessages),
  firstName: Joi.string().required().messages({
    'string.empty': messages.FIRST_NAME_REQUIRED,
    'any.required': messages.FIRST_NAME_REQUIRED
  }),
  lastName: Joi.string().required().messages({
    'string.empty': messages.LAST_NAME_REQUIRED,
    'any.required': messages.LAST_NAME_REQUIRED
  }),
  password: Joi.string().required().min(6).messages(passwordMessages),
  role: Joi.string().valid('user', 'admin').default('user').messages({
    'any.only': messages.INVALID_ROLE
  }),
  gender: Joi.string().required().valid('male', 'female').messages({
    'any.required': messages.GENDER_REQUIRED,
    'any.only': messages.INVALID_GENDER
  })
});

function validateRegisterUser(req: Request, res: Response, next: NextFunction) {
  const { error } = registerUserSchema.validate(req.body, {
    allowUnknown: true, // Allow extra fields in the request body
  });
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: error.message, error: error.details });
  } else {
    next();
  }
}

export { 
  validateLoginUser,
  validateRegisterUser
 };