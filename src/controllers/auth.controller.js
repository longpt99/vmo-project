import { loginService, refreshTokenService } from '../services/auth.service';
import { signToken } from '../services/tokenService';

export { login, refreshToken };

const login = async (req, res) => {
  try {
    const response = await loginService(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const refreshToken = async (req, res) => {
  try {
    const response = await refreshTokenService(
      req.body.refreshToken,
      res.locals.personalId
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
  } catch (error) {}
};
