import { ErrorHandler } from '../helpers/response.helper';
import { decodeToken, verifyToken } from '../helpers/token.helper';

export default async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.body;
    if (!accessToken || !refreshToken) {
      throw new ErrorHandler(401, 'Unauthorization', 'UNAUTHORIZATION');
    }
    const accessPayload = decodeToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );

    if (accessPayload.exp * 1000 > Date.now()) {
      throw new ErrorHandler(401, 'Unauthorization', 'UNAUTHORIZATION');
    }
    const refreshPayload = verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );
    if (accessPayload.personalId !== refreshPayload.personalId) {
      throw new ErrorHandler(401, 'Unauthorization', 'UNAUTHORIZATION');
    }
    res.locals.personalId = refreshPayload.personalId;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new ErrorHandler(401, error.message, 'UNAUTHORIZATION'));
    }
    return next(error);
  }
};
