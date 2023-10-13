import express from "express";
import * as userController from '../controllers/user.controller';
import { authMiddleware } from "../middleware/jwt.validation";
import {
  validateForgotPassword,
  validateLoginUser,
  validateRegisterUser,
  validateResetPassword
} from "../validators/auth.validator";

export const authRouter = express.Router();

authRouter.post('/login', validateLoginUser, userController.login);
authRouter.post('/register', authMiddleware, validateRegisterUser, userController.registerUser);
authRouter.post('/activate/:token', userController.activateUser);
authRouter.post('/forgot-password', validateForgotPassword, userController.forgotPassword);
authRouter.post('/resetPassword/:token', validateResetPassword, userController.resetPassword);