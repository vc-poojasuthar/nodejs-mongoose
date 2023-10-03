import mongoose from "mongoose";
import User, { IUserModel } from '../models/user.model';
import { messages } from "../config/api.messages";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config();

export async function login(body: { email: string; password: string }) {
  const user = await User.findOne({ email: body.email });
  if (!user || !(await bcrypt.compare(body.password, user.password))) {
    throw new Error(messages.AUTH_FAILED);
  }
  const key = process.env.SECRET_KEY ?? '';
  const expiresIn = process.env.EXPIRES_TIME ?? '1h';
  const token: string = jwt.sign({ userId: user._id }, key, {
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
    throw new Error(messages.EMAIL_ALREADY_EXISTS);
  }
  body._id = new mongoose.Types.ObjectId();
  const key = process.env.SECRET_KEY ?? '';
  const expiresIn = process.env.EXPIRES_TIME ?? '1h';
  const token: string = jwt.sign({ userId: body._id }, key, {
    expiresIn,
  });
  body.token = token;
  return await User.create(body);
}

export async function activateUser(userId: string) {
  const user = await User.findByIdAndUpdate(userId, { isActive: true, token: '' });
  if (!user) {
    throw new Error(messages.USER_NOT_FOUND);
  }
  return user;
}

export async function getUsers(query: any, page: number, limit: number, sortField: string, sortOrder: number) {
  const sortOptions: any = {};
  sortOptions[sortField] = sortOrder;

  const data = await User.find(query)
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(limit);

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