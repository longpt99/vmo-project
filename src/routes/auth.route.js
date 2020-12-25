import express from 'express';
import {
  getProfile,
  login,
  refreshToken,
} from '../controllers/auth.controller';
import {
  bearerToken,
  refreshTokenHandler,
  verifyRequest,
} from '../middlewares';
const router = express.Router();

router.route('/auth/login').post(verifyRequest, login);

router
  .route('/auth/refresh-token')
  .post(verifyRequest, refreshTokenHandler, refreshToken);

router.route('/auth/profile').get(bearerToken, getProfile);

export default router;
