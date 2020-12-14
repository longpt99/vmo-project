import { Schema, model } from 'mongoose';

const ProjectTypeSchema = new Schema(
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

export default model('ProjectType', ProjectTypeSchema, 'project-types');
