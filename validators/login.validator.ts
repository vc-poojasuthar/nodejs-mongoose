import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { messages } from '../config/api.messages';

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

const schema = Joi.object({
  email: Joi.string().email().required().messages(emailMessages),
  password: Joi.string().required().length(7).messages(passwordMessages),
});

function validateLoginUser(req: Request, res: Response, next: NextFunction) {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send({ message: error.message, error: error.details });
  } else {
    next();
  }
}

export { validateLoginUser };