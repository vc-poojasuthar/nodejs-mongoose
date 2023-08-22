import mongoose from "mongoose";
import User, { IUserModel } from '../models/users';

export async function registration(body: IUserModel) {
  body._id = new mongoose.Types.ObjectId();
  return await User.create(body);
}

export function getUsers(condition: any) {
  const data = User.find({ condition });//.sort({ createdAt: -1 }).limit(10);
  return data;
}

export function getUserById(id: string) {
  return User.findById(id);
}

export function updateUser(userId: string, body: any) {
  return User.findByIdAndUpdate({ _id: userId }, body, { new: true, strict: false });
}

export function deleteUser(userId: string) {
  return User.deleteOne({ _id: userId });
}