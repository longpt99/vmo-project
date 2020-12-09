import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const DepartmentSchema = new Schema(
  {
    name: String,
    description: String,
    techStacksId: [Schema.Types.ObjectId],
    projectsId: [Schema.Types.ObjectId],
    staffsId: [Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

export default model('Department', DepartmentSchema);
