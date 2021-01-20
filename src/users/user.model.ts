import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  points: { type: Number, required: true },
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  surname: string;
  points: number;
}