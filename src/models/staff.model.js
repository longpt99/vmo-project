import { Schema, model } from 'mongoose';

const StaffSchema = new Schema(
  {
    name: String,
    email: String,
    dob: Date,
    phoneNumber: String,
    address: { type: String, default: '' },
    identityNumber: String,
    languages: [String],
    certs: [String],
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
  },
  {
    timestamps: true,
  }
);

export default model('Staff', StaffSchema);
