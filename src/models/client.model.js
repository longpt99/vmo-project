import { Schema, model } from 'mongoose';

const ClientSchema = new Schema(
  {
    token: String,
    name: String,
  },
  {
    timestamps: true,
  }
);

export default model('Client', ClientSchema);
