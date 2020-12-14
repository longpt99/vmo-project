import { loginService, refreshTokenService } from '../services/auth.service';
export { login, refreshToken };

const login = async (req, res, next) => {
  try {
    const response = await loginService(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};
const refreshToken = async (req, res, next) => {
  try {
    const response = await refreshTokenService(
      req.body.refreshToken,
      res.locals.personalId
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};
