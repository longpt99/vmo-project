import { Schema, model } from 'mongoose';

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
