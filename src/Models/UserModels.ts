import { User } from '@Core/Models/User';
import mongoose, { mongo } from 'mongoose';

export const UserSchema = new mongoose.Schema<User>({
  email: { type: String, require: true },
  password: { type: String, require: true },
  fullName: { type: String, require: true },
  userType: { type: String, require: true },
  phone: { type: String, require: true },
  dateOfBird: { type: Date, require: true },
  registerDay: { type: Date, default: new Date() },
  numberOfKms: { type: Number, default: 0 },
  numberOfTrips: { type: Number, default: 0 },
  avatar: { type: String },
  isActive: { type: Boolean, default: true },
});

export const UserModel = mongoose.model('User', UserSchema);
