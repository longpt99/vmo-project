import { ErrorHandler } from '../helpers/response.helper';
import { verifyToken } from '../helpers/token.helper';

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new ErrorHandler(
        401,
        'You must send an Authorization header',
        'UNAUTHORIZATION'
      );
    }
    const [authType, token] = authorization.trim().split(' ');
    if (authType !== 'Bearer') {
      throw new ErrorHandler(401, 'Expected a Bearer token', 'UNAUTHORIZATION');
    }
    const user = verifyToken(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    res.locals.personalId = user.personalId;
    res.locals.roleStaffId = user.roleStaffId;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new ErrorHandler(401, error.message, 'UNAUTHORIZATION'));
    }
    return next(error);
  }
};
