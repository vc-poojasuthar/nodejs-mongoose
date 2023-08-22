import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const connect = () => {  
  const url = process.env.DATABASE_URI as string;
   mongoose.connect(url);
};

export const disconnect = () => {
  mongoose.disconnect();
};