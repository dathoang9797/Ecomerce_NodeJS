import mongoose from 'mongoose';
export interface ICategory {
    id: string;
    name: string;
    color: string;
    icon: string;
    image: string;
}
export declare const CategoryModel: mongoose.Model<ICategory, {}, {}, {}, mongoose.Schema<ICategory, mongoose.Model<ICategory, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ICategory>>;
