import { Schema, model } from 'mongoose';

const RoleSchema = new Schema(
  {
    staffId: Schema.Types.ObjectId,
    permsId: [Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

export default model('Role', RoleSchema);
