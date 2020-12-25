import { ErrorHandler, handleResponse } from '../helpers/response.helper';
import { Account, Staff } from '../models';
import { findOne } from './commonQuery.service';
import { signToken } from '../helpers/token.helper';

export { loginService, refreshTokenService };

const loginService = async (data) => {
  try {
    const { email, password } = data;
    const personal = await findOne(Account, { email }, 'password personalId');
    if (!personal) {
      throw new ErrorHandler(404, 'Account not exists', 'INVALID');
    }
    const isMatch = await personal.comparePassword(password);
    if (!isMatch) {
      throw new ErrorHandler(404, 'Wrong password', 'WRONG_PASSWORD');
    }

    const staffRecord = await findOne(
      Staff,
      { _id: personal.personalId },
      'name role -_id',
      {
        path: 'role',
        model: 'Role',
        select: { roleName: 1, _id: 0 },
      }
    );

    const payload = {
      roleStaffId: staffRecord.role,
      personalId: personal.personalId,
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
      token: { tokenType: 'Bearer', accessToken, refreshToken },
      payload: staffRecord,
    });
  } catch (error) {
    throw error;
  }
};

const refreshTokenService = (refreshToken, payload) => {
  try {
    const accessToken = signToken(
      { payload },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      process.env.ACCESS_TOKEN_EXPIRED_TIME
    );
    return handleResponse(200, 'Login successfully', 'SUCCEED', {
      tokenType: 'Bearer',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw error;
  }
};
