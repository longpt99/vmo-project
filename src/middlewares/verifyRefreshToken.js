import { ErrorHandler } from '../helpers/response';
import { decodeToken, verifyToken } from '../services/tokenService';

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
      console.log(123);
      throw new ErrorHandler(401, 'Unauthorization', 'UNAUTHORIZATION');
    }
    console.log(accessPayload);
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
    error.status = 401;
    return res.status(error.status).json(error);
  }
};
