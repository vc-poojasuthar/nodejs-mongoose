import mongoose from "mongoose";
import User, { IUserModel } from '../models/users';

export async function registration(body: IUserModel) {
  body._id = new mongoose.Types.ObjectId();
  return await User.create(body);
}

export async function getUsers(query: any, limit: number, sortField: string, sortOrder: number) {
  const sortOptions: any = {};
  sortOptions[sortField] = sortOrder;

  const data = await User.find(query)
    .limit(limit)
    .sort(sortOptions);

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