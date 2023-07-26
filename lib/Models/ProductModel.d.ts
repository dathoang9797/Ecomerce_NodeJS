import mongoose from 'mongoose';
export interface IProduct {
    id: string;
    name: string;
    description: string;
    richDescription: string;
    image: string;
    images: string[];
    brand: string;
    price: number;
    category: mongoose.Types.ObjectId;
    countInStock: number;
    rating: number;
    numReviews: number;
    isFeatured: boolean;
    dateCreated: Date;
}
export declare const ProductModel: mongoose.Model<IProduct, {}, {}, {}, mongoose.Schema<IProduct, mongoose.Model<IProduct, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IProduct>>;
