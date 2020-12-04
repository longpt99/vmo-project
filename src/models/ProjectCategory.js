import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ProjectCategorySchema = new Schema(
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

export default model(
  'ProjectCategory',
  ProjectCategorySchema,
  'project-categories'
);
