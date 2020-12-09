import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const CustomerSchema = new Schema(
  {
    name: String,
    description: String,
    priorityNumber: Number,
    status: String,
  },
  {
    timestamps: true,
  }
);

export default model('Customer', CustomerSchema);
