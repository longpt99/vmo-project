import { Schema, model } from 'mongoose';

const DepartmentSchema = new Schema(
  {
    name: String,
    description: String,
    techStacksId: [{ type: Schema.Types.ObjectId, ref: 'TechStack' }],
    projectsId: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    staffsId: [{ type: Schema.Types.ObjectId, ref: 'Staff' }],
  },
  {
    timestamps: true,
  }
);

export default model('Department', DepartmentSchema);
