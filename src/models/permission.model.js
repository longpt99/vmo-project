import { Schema, model } from 'mongoose';

const PermissionSchema = new Schema(
  {
    name: String,
    routes: [{ name: String, path: String, method: String, active: Boolean }],
  },
  {
    timestamps: true,
  }
);

export default model('Permission', PermissionSchema);
