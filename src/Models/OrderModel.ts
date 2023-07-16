import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema<any>({
    name: String,
    image: String,
    countInStock: {
      type: Number,
      required: true,
    }
  });
  
  export const OrdertModel = mongoose.model('Order', OrderSchema);