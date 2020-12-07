import { compare, hash } from 'bcrypt';
import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const AccountSchema = new Schema(
  {
    email: String,
    password: String,
    personalId: Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

AccountSchema.pre('save', async function (next) {
  if (this.password) {
    this.password = await hash(this.password, 6);
  }
  next();
});

AccountSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

export default model('Account', AccountSchema);
