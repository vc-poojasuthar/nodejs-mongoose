import mongoose from "mongoose";

export interface IProduct {
  name: string;
  categoryId: mongoose.Schema.Types.ObjectId;
  unit: string;
  price:number;
  expiryDate: Date;
}
