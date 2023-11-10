
import mongoose, { Document, Schema } from 'mongoose';
import { IProduct } from '../interfaces/product.interface';


export interface IProductModel extends IProduct, Document { }

const productSchema = new Schema<IProductModel>({  
  name: {
    type: String,
    required: true,
    trim: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  unit: {
    type: String,
  },
  price: {
    type: Number,
  },  
  expiryDate: {
    type: Date
  }
}, {
  timestamps: true
});

export default mongoose.model<IProductModel>("Product", productSchema);
