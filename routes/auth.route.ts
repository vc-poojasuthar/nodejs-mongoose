import express from "express";
import * as userController from '../controllers/user.controller';
import { authMiddleware } from "../middleware/jwt.validation";
import { validateLoginUser } from "../validators/login.validator";

export const authRouter = express.Router();

authRouter.post('/login', validateLoginUser, userController.login);
authRouter.post('/register', authMiddleware, userController.registerUser);