import { Account, Staff, StaffExp } from '../models';
import { Types } from 'mongoose';

export default async (req, res, next) => {
  try {
    const email = 'admin01@gmail.com';
    const password = 'admin123';
    const staffId = Types.ObjectId();
    const name = 'Administrater';

    const accountRecord = await Account.findOne({ email }, 'id');
    if (accountRecord) {
      return next();
    }
    await Promise.all([
      Account.create({ personalId: staffId, password, email }),
      Staff.create({
        _id: staffId,
        email,
        name,
      }),
      StaffExp.create({ staffId }),
    ]);
    console.log('Create account successfully');
    return next();
  } catch (error) {
    return next(error);
  }
};
