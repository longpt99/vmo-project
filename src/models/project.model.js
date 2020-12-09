import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ProjectSchema = new Schema(
  {
    name: String,
    description: String,
    projectTypesId: [Schema.Types.ObjectId],
    techStacksId: [Schema.Types.ObjectId],
    departmentsId: [Schema.Types.ObjectId],
    staffsId: [Schema.Types.ObjectId],
    customersId: [Schema.Types.ObjectId],
    projectStatusId: Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

export default model('Project', ProjectSchema);
