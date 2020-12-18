import express from 'express';
import { login, refreshToken } from '../controllers/auth.controller';
import { refreshTokenHandler, verifyRequest } from '../middlewares';
const router = express.Router();

router.route('/auth/login').post(verifyRequest, login);

router
  .route('/auth/refresh-token')
  .post(verifyRequest, refreshTokenHandler, refreshToken);

export default router;
