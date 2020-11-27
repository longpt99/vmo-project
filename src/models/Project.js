import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ProjectSchema = new Schema(
  {
    name: String,
    description: String,
    projectCategoryId: Schema.Types.ObjectId,
    techsId: [Schema.Types.ObjectId],
    officesId: [Schema.Types.ObjectId],
    staffsId: [Schema.Types.ObjectId],
    customerId: Schema.Types.ObjectId,
    status: String,
  },
  {
    timestamps: true,
  }
);

export default model('Project', ProjectSchema);
