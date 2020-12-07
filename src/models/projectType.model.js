import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ProjectTypeSchema = new Schema(
  {
    name: String,
    description: String,
    priorityPoint: Number,
    status: String,
  },
  {
    timestamps: true,
  }
);

export default model('ProjectType', ProjectTypeSchema, 'project-types');
