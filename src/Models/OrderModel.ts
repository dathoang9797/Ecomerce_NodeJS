import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema<any>({
    name: String,
    image: String,
    countInStock: {
      type: Number,
      required: true,
    }
  });
  
  // OrderSchema.virtual('id').get(function () {
  //   return this._id.toHexString();
  // })
  
  // OrderSchema.set('toJSON', {
  //   virtuals: true
  // })

  export const OrdertModel = mongoose.model('Order', OrderSchema);