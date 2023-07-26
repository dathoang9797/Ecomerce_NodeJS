import mongoose from 'mongoose';
import { IUser } from './UserModel';
export interface IOrder {
    id: string;
    orderItems: mongoose.Schema.Types.ObjectId[];
    shippingAddress1: string;
    shippingAddress2: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
    status: string;
    totalPrice: number;
    user: IUser;
    dateOrdered: Date;
}
export declare const OrderModel: mongoose.Model<IOrder, {}, {}, {}, mongoose.Schema<IOrder, mongoose.Model<IOrder, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IOrder>>;
