import express from "express";
import * as userController from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.post('/', userController.registerUser);
userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);