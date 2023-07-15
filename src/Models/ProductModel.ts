import { IProduct } from '@Core/Models';
import mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema<IProduct>({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  }
});

export const ProductModel = mongoose.model('Product', ProductSchema); 