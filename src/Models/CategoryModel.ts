import mongoose from 'mongoose';

export interface ICategory {
  id: string,
  name: string,
  color: string,
  icon: string,
  image: string
}

const CategorySchema = new mongoose.Schema<ICategory>({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
   
  },
  image: {
    type: String,
  },
});

export const CategoryModel = mongoose.model('Category', CategorySchema);