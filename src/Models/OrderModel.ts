import mongoose from 'mongoose';
import { IOrderItem } from './OrderItemModel';
import { IUser } from './UserModel';

export interface IOrder {
  id: string,
  orderItems: IOrderItem[],
  shippingAddress1: string,
  shippingAddress2: string,
  city: string,
  zip: string,
  country: string,
  phone: string,
  status: string,
  totalPrice: number,
  user: IUser,
  dateOrdered: Date
}

const OrderSchema = new mongoose.Schema<IOrder>({

  shippingAddress1: {
    type: String,
    required: true
  },
  shippingAddress2: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'Pending'
  },
  totalPrice: {
    type: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateOrdered: {
    type: Date,
    default: Date.now
  },
  orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderItem',
    required: true,
  }],
});

OrderSchema.virtual('id').get(function () {
  return this._id.toHexString();
})

OrderSchema.set('toJSON', {
  virtuals: true
})

export const OrderModel = mongoose.model('Order', OrderSchema);