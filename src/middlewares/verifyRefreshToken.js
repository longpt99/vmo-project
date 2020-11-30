import { verifyToken, decodeToken } from '../services/tokenService';

export default (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.signedCookies.token;
    if (!accessToken || !refreshToken) {
      throw new Error('Unauthorization');
    }
    const accessPayload = decodeToken(accessToken, process.env.JWT_SECRET_KEY);
    if (accessPayload.exp * 1000 > Date.now()) {
      throw new Error('Unauthorization');
    }
    const refreshPayload = verifyToken(
      refreshToken,
      process.env.REFRESH_JWT_SECRET_KEY
    );
    if (accessPayload.userId !== refreshPayload.userId) {
      throw new Error('Unauthorization');
    }
    res.locals.refreshToken = refreshPayload;
    return next();
  } catch (error) {
    error.statusCode = 401;
  }
};
