import mongoose from 'mongoose';
export interface IOrderItem {
    id: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
    quantity: number;
}
export declare const OrderItemModel: mongoose.Model<IOrderItem, {}, {}, {}, mongoose.Schema<IOrderItem, mongoose.Model<IOrderItem, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IOrderItem>>;
