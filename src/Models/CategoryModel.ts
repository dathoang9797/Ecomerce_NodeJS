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

CategorySchema.virtual('id').get(function () {
	return this._id.toHexString();
})

CategorySchema.set('toJSON', {
	virtuals: true
})

export const CategoryModel = mongoose.model('Category', CategorySchema);