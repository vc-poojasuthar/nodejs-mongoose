import mongoose from "mongoose";

export interface ICartDetail {
  userId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId;
  qty: number;
}

