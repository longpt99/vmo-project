import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const TechStackSchema = new Schema(
  {
    name: String,
    description: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

export default model('TechStack', TechStackSchema, 'tech-stacks');
