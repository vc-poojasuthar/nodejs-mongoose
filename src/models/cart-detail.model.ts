
import mongoose, { Document, Schema } from 'mongoose';
import { ICartDetail } from '../interfaces/cart-detail.interface';

export interface ICartDetailModel extends ICartDetail, Document { }

const cartDetailSchema = new Schema<ICartDetailModel>({  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },  
  qty: {
    type: Number,
  }
}, {
  timestamps: true
});

export default mongoose.model<ICartDetailModel>("CartDetail", cartDetailSchema);
