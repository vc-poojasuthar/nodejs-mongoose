import mongoose from "mongoose";
import User, { IUserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
import { AuthFailedException, EmailAlreadyExistsException, NotFoundException } from "../config/custom-exceptions";
import { messages } from "../config/api-messages";
dotenv.config();

export const JWT_SECRET_KEY = process.env.JWT_SECRET as string;

export async function login(body: { email: string; password: string }) {
  const user = await User.findOne({ email: body.email });
  if (!user || !(await bcrypt.compare(body.password, user.password))) {
    throw new AuthFailedException();
  }
 
  const expiresIn = process.env.EXPIRES_TIME;
  const token: string = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
    expiresIn,
  });
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    role: user.role,
    gender: user.gender,
    isActive: user.isActive,
    token: token
  };
}

export async function registration(body: IUserModel) {
  const user = await User.findOne({ email: body.email });
  if (user) {
    throw new EmailAlreadyExistsException();
  }
  body._id = new mongoose.Types.ObjectId();

  const expiresIn = process.env.EXPIRES_TIME;
  const token: string = jwt.sign({ userId: body._id }, JWT_SECRET_KEY, {
    expiresIn,
  });
  body.token = token;
  return await User.create(body);
}

export async function activateUser(userId: string) {
  const user = await User.findByIdAndUpdate(userId, { isActive: true, token: '' });
  if (!user) {
    throw new NotFoundException(messages.USER_NOT_FOUND);
  }
  return user;
}

export async function forgotPassword(email: string) {
  const user = await User.findOne({ email });
  if (!user) throw new NotFoundException(messages.USER_NOT_FOUND);
 
  const expiresIn = process.env.EXPIRES_TIME;
  const token: string = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
    expiresIn,
  });
  await user.updateOne({ token: token }); 
  return user;
}

export async function resetPassword(userId: string, password: string) {
  const user = await User.findById(userId);
    if (!user) {
    throw new NotFoundException(messages.USER_NOT_FOUND);
  }
  user.token ='';
  user.password = password;
  return await user.save();  
}

export async function getUsers(query: any, page: number, limit: number, sortField: string, sortOrder: number) {
  const sortOptions: any = {};
  sortOptions[sortField] = sortOrder;

  const data = await User.find(query)
    .select('-password -token -createdAt -updatedAt')
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return data;
}

export async function getUserById(id: string) {
  return await User.findById(id);
}

export async function updateUser(userId: string, body: any) {
  return await User.findByIdAndUpdate({ _id: userId }, body, { new: true, strict: false });
}

export async function deleteUser(userId: string) {
  return await User.deleteOne({ _id: userId });
}