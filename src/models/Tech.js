import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const TechSchema = new Schema(
  {
    name: String,
    description: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

export default model('Tech', TechSchema, 'techStacks');
