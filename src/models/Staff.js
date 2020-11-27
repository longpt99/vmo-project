import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const StaffSchema = new Schema(
  {
    name: String,
    dob: Date,
    phoneNumber: String,
    address: String,
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
