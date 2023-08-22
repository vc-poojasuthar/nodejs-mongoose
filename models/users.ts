
import mongoose, { Document, Schema } from 'mongoose';

import { IUser } from '../interfaces/users';

export interface IUserModel extends IUser, Document { }

export const User: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: false },
  confirmPassword: { type: String, required: false },
  type: { type: String, required: false, default: 'user' },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"]
  },
}, {
  timestamps: true
});

export default mongoose.model<IUserModel>("User", User);
