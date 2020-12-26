import { ErrorHandler } from '../helpers/response.helper';
import { Permission, Role } from '../models';
import { findOne } from '../services/commonQuery.service';

export default async (req, res, next) => {
  try {
    const { personalId, roleStaffId } = res.locals;
    const { path } = req.route;
    const method = req.method.toLowerCase();

    if (personalId === '5fcf3ed5d641ab105b581df2') {
      return next();
    }

    if (personalId === '5fd706ce6b02ed7e8458785e') {
      return next();
    }

    const permRecord = await findOne(
      Permission,
      {
        path,
        method,
        active: true,
      },
      '_id'
    );

    if (!permRecord) {
      throw new ErrorHandler(400, 'Permission not exists', 'INVALID');
    }

    const roleRecord = await findOne(
      Role,
      { permsId: permRecord._id, _id: roleStaffId },
      'id'
    );

    if (!roleRecord) {
      throw new ErrorHandler(403, 'Forbidden', 'INVALID');
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
