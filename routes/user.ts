import express from "express";
import * as userController from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.post('/login', userController.login);
userRouter.post('/register', userController.registerUser);
userRouter.get('/users', userController.getUsers);
userRouter.get('/user/:id', userController.getUserById);
userRouter.put('/user/:id', userController.updateUser);
userRouter.delete('/user/:id', userController.deleteUser);