
import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../interfaces/users';
import bcrypt from 'bcrypt';

export interface IUserModel extends IUser, Document { }

export const User = new Schema<IUserModel>({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: false,
    enum: ["user", "admin"],
    default: 'user'
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"]
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true
  }
}, {
  timestamps: true
});

User.pre<IUserModel>('save', async function (next: (error?: Error) => void) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error as Error);
  }
});

User.methods.comparePassword = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

export default mongoose.model<IUserModel>("User", User);
