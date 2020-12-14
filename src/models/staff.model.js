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
    rolesId: [Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);
// StaffSchema.plugin(uniqueValidator);

export default model('Staff', StaffSchema);
