import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const connect = () => {
  mongoose.set('debug', true);
  // mongoose.set('timestamps', {
  //   createdAt: 'created_at',
  //   updatedAt: 'updated_at',
  //   currentTime: () => new Date().toISOString(),
  // });
  const url = process.env.DATABASE_URI as string;
  mongoose.connect(url);
};


export const disconnect = () => {
  mongoose.disconnect();
};