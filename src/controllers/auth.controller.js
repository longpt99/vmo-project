import { loginService, refreshTokenService } from '../services/auth.service';
import { getStaffService } from '../services/staff.service';
export { login, refreshToken, getProfile };

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

const getProfile = async (req, res, next) => {
  try {
    const response = await getStaffService(res.locals.personalId);
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
