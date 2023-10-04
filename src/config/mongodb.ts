import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const connect = () => {
  mongoose.set('debug', true); // For debugging mode
  const url = process.env.MONGODB_URL as string;
  mongoose.connect(url);
};


export const disconnect = () => {
  mongoose.disconnect();
};