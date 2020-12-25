import { Schema, model } from 'mongoose';

const RoleSchema = new Schema(
  {
    roleName: String,
    permsId: [Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

export default model('Role', RoleSchema);
