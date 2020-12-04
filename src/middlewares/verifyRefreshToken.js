import { ErrorHandler } from '../helpers/response';
import { decodeToken, verifyToken } from '../services/tokenService';

export default async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.headers;
    if (!accessPayload || !refreshPayload) {
      throw new ErrorHandler(401, 'Unauthorization', 'UNAUTHORIZATION');
    }
    const accessPayload = decodeToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    const refreshPayload = verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );
    if (accessPayload.personalId !== refreshPayload.personalId) {
      throw new ErrorHandler(401, 'Unauthorization', 'UNAUTHORIZATION');
    }
    res.locals.refreshToken = refreshToken;
    return next();
  } catch (error) {
    error.status = 401;
    return res.status(error.status).json(error);
  }
};
