import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ProjectSchema = new Schema(
  {
    name: String,
    description: String,
    projectTypeId: Schema.Types.ObjectId,
    techStacksId: [Schema.Types.ObjectId],
    departmentsId: [Schema.Types.ObjectId],
    staffsId: [Schema.Types.ObjectId],
    customerId: Schema.Types.ObjectId,
    status: String,
  },
  {
    timestamps: true,
  }
);

export default model('Project', ProjectSchema);
