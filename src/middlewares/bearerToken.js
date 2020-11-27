import { ErrorHandler } from '../helpers/response';
import { verifyToken } from '../services/tokenService';

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
    const user = verifyToken(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(error.status).json(error);
  }
};
