import express from "express";
import * as userController from '../controllers/user.controller';
import { authMiddleware } from "../middleware/jwt.validation";
export const userRouter = express.Router();

userRouter.post('/login', userController.login);
userRouter.post('/register', authMiddleware, userController.registerUser);
userRouter.get('/users', authMiddleware, userController.getUsers);
userRouter.get('/user/:id', authMiddleware, userController.getUserById);
userRouter.put('/user/:id', authMiddleware, userController.updateUser);
userRouter.delete('/user/:id', authMiddleware, userController.deleteUser);