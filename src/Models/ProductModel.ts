import mongoose from 'mongoose';

export interface IProduct {
  id: string,
  name: string,
  description: string,
  richDescription: string,
  image: string,
  images: string[],
  brand: string,
  price: number,
  category: mongoose.Types.ObjectId,
  countInStock: number,
  rating: number,
  numReviews: number,
  isFeatured: boolean,
  dateCreated: Date
}

const ProductSchema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  richDescription: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  brand: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

ProductSchema.virtual('id').get(function () {
  return this._id.toHexString();
})

ProductSchema.set('toJSON', {
  virtuals: true
})

export const ProductModel = mongoose.model('Product', ProductSchema);