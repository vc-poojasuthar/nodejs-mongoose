import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { messages } from '../config/api-messages';
import { HttpStatus } from '../config/http-status';

const emailSchema = Joi.string().email().required().messages({
  'string.empty': messages.EMAIL_REQUIRED,
  'any.required': messages.EMAIL_REQUIRED,
  'string.email': messages.EMAIL_INVALID,
});

const passwordSchema = Joi.string().required().min(6).messages({
  'string.empty': messages.PASSWORD_REQUIRED,
  'any.required': messages.PASSWORD_REQUIRED,
  'string.length': messages.PASSWORD_LENGTH,
});

const roleSchema = Joi.string().valid('user', 'admin').default('user').messages({
  'any.only': messages.INVALID_ROLE,
});

const genderSchema = Joi.string().required().valid('male', 'female').messages({
  'any.required': messages.GENDER_REQUIRED,
  'any.only': messages.INVALID_GENDER,
});

function createValidationMiddleware(schema: Joi.ObjectSchema<any>) {
  return (req :Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { allowUnknown: true });
    if (error) {
      res.status(HttpStatus.BAD_REQUEST).send({ message: error.message, error: error.details });
    } else {
      next();
    }
  };
}

const validateLoginUser = createValidationMiddleware(
  Joi.object({
    email: emailSchema,
    password: passwordSchema,
  })
);

const validateRegisterUser = createValidationMiddleware(
  Joi.object({
    email: emailSchema,
    firstName: Joi.string().required().messages({
      'string.empty': messages.FIRST_NAME_REQUIRED,
      'any.required': messages.FIRST_NAME_REQUIRED,
    }),
    lastName: Joi.string().required().messages({
      'string.empty': messages.LAST_NAME_REQUIRED,
      'any.required': messages.LAST_NAME_REQUIRED,
    }),
    password: passwordSchema,
    role: roleSchema,
    gender: genderSchema,
  })
);

const validateResetPassword = createValidationMiddleware(
  Joi.object({
    password: passwordSchema,
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .messages({
        'string.empty': messages.EMAIL_REQUIRED,
        'any.required': messages.EMAIL_REQUIRED,
        'string.email': messages.EMAIL_INVALID,
        'any.only': messages.PASSWORD_NOT_MATCH,
      }),
  })
);

const validateForgotPassword = createValidationMiddleware(
  Joi.object({
    email: emailSchema,
  })
);

export {
  validateLoginUser,
  validateRegisterUser,
  validateResetPassword,
  validateForgotPassword,
};
