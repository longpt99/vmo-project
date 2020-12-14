import { Schema, model } from 'mongoose';

const ProjectStatusSchema = new Schema(
  {
    name: String,
    description: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

export default model('ProjectStatus', ProjectStatusSchema, 'project-statuses');
