import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ProjectStatusSchema = new Schema(
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

export default model('ProjectStatus', ProjectStatusSchema, 'project-statuses');
