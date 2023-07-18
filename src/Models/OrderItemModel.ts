import mongoose, { ObjectId } from 'mongoose';
import { IProduct } from './ProductModel';
import { IUser } from './UserModel';

export interface IOrderItem {
    id: mongoose.Types.ObjectId,
    product: mongoose.Types.ObjectId;
    quantity: number,
}

const OrderItemSchema = new mongoose.Schema<IOrderItem>({
    quantity: {
        type: Number,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});

OrderItemSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

OrderItemSchema.set('toJSON', {
    virtuals: true
})

export const OrderItemModel = mongoose.model('OrderItem', OrderItemSchema);