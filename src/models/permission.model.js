import { Schema, model } from 'mongoose';

const PermissionSchema = new Schema(
  {
    name: String,
    path: String,
    method: String,
    active: Boolean,
    groupName: String,
  },
  {
    timestamps: true,
  }
);

export default model('Permission', PermissionSchema);
