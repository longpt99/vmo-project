import { ErrorHandler, handleError, handleResponse } from '../helpers/response';
import { Account } from '../models';
import { findOne } from './commonQuery.service';
import { signToken } from './tokenService';

export { loginService, refreshTokenService };

const loginService = async (data) => {
  try {
    const { email, password } = data;
    const personal = await findOne(Account, { email }, 'password');
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
    return handleResponse(200, 'Login successfully', 'LOGIN_SUCCESSFULLY', {
      tokenType: 'Bearer',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return handleError(error);
  }
};

const refreshTokenService = (refreshToken, payload) => {
  try {
    console.log(refreshToken);
    const accessToken = signToken(
      { payload },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      process.env.ACCESS_TOKEN_EXPIRED_TIME
    );
    return handleResponse(200, 'Login successfully', 'LOGIN_SUCCESSFULLY', {
      tokenType: 'Bearer',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return handleError(error);
  }
};
