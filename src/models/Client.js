import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

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
