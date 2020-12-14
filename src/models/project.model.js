import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema(
  {
    name: String,
    description: String,
    projectTypesId: [{ type: Schema.Types.ObjectId, ref: 'ProjectType' }],
    techStacksId: [{ type: Schema.Types.ObjectId, ref: 'TechStack' }],
    departmentsId: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
    staffsId: [{ type: Schema.Types.ObjectId, ref: 'Staff' }],
    customersId: [{ type: Schema.Types.ObjectId, ref: 'Customer' }],
    projectStatusId: { type: Schema.Types.ObjectId, ref: 'ProjectStatus' },
  },
  {
    timestamps: true,
  }
);

export default model('Project', ProjectSchema);
