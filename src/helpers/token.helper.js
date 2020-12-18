import { sign, decode, verify } from 'jsonwebtoken';

export { signToken, decodeToken, verifyToken };

const signToken = (payload, secretKey, expiredTime) =>
  sign(payload, secretKey, {
    expiresIn: expiredTime,
  });

const verifyToken = (token, secretKey) => verify(token, secretKey);

const decodeToken = (token, secretKey) => decode(token, secretKey);
