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
    const user = verifyToken(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    req.user = user;
    return next();
  } catch (error) {
    if (error instanceof ErrorHandler) {
      res.status(error.status);
    } else {
      res.status(500);
    }
    return res.json(error);
  }
};
