import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const OfficeSchema = new Schema(
  {
    name: String,
    techsId: [Schema.Types.ObjectId],
    projectsId: [Schema.Types.ObjectId],
    staffsId: [Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

export default model('Office', OfficeSchema);
