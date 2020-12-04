import { ErrorHandler, handleResponse } from '../helpers/response';
import { Account } from '../models';
import { signToken } from '../services/tokenService';

export { login, refreshToken };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const personal = await Account.findOne({ email });
    if (!personal) {
      throw new ErrorHandler(404, 'User not found', 'USER_NOT_FOUND');
    }
    const isMatch = await personal.comparePassword(password);
    if (!isMatch) {
      throw new ErrorHandler(404, 'Wrong password', 'WRONG_PASSWORD');
    }
    const payload = {
      personalId: personal.id,
    };
    const accessToken = signToken(
      payload,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      process.env.ACCESS_TOKEN_EXPIRED_TIME
    );
    const refreshToken = signToken(
      payload,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      process.env.REFRESH_TOKEN_EXPIRED_TIME
    );
    const response = handleResponse(
      200,
      'Login successfully',
      'LOGIN_SUCCESSFULLY',
      {
        tokenType: 'Bearer',
        accessToken,
        refreshToken,
      }
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = res.locals;
    const accessToken = signToken(
      { personalId: refreshToken.personalId },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      process.env.ACCESS_TOKEN_EXPIRED_TIME
    );
    const response = handleResponse(
      200,
      'Login successfully',
      'LOGIN_SUCCESSFULLY',
      {
        tokenType: 'Bearer',
        accessToken,
        refreshToken,
      }
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const resetPassword = async (req, res) => {
  try {
  } catch (error) {}
};
