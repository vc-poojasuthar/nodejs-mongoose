import express from "express";
import * as userController from '../controllers/user.controller';
import { authMiddleware } from "../middleware/jwt.validation";

export const userRouter = express.Router();

userRouter.get('/', authMiddleware, userController.getUsers);
userRouter.get('/:id', authMiddleware, userController.getUserById);
userRouter.put('/:id', authMiddleware, userController.updateUser);
userRouter.delete('/:id', authMiddleware, userController.deleteUser);