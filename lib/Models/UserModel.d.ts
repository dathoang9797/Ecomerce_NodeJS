import mongoose from 'mongoose';
export interface IUser {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    street: string;
    apartment: string;
    city: string;
    zip: string;
    country: string;
    phone: number;
    isAdmin: boolean;
}
export declare const UserModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Schema<IUser, mongoose.Model<IUser, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IUser>>;
