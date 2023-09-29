import express from "express";
import * as userController from '../controllers/user.controller';
import { authMiddleware } from "../middleware/jwt.validation";

export const authRouter = express.Router();

authRouter.post('/login', userController.login);
authRouter.post('/register', authMiddleware, userController.registerUser);