import mongoose from 'mongoose';

export interface IUser {
    id: string,
    name: string,
    email: string,
    passwordHash: string,
    street: string,
    apartment: string,
    city: string,
    zip: string,
    country: string,
    phone: number,
    isAdmin: boolean
}

const UserSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    street: {
        type: String,
        default: ''
    },
    apartment: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        required: true,
        default: ''
    },
    phone: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
});

UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

UserSchema.set('toJSON', {
    virtuals: true
})

export const UserModel = mongoose.model('User', UserSchema);