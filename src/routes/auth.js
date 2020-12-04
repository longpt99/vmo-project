import express from 'express';
import { login, refreshToken } from '../controllers/authController';
import { verifyRefreshToken, verifyRequest } from '../middlewares';
const router = express.Router();

router.route('/auth/login').post(login);

router.route('/auth/refresh-token').post(verifyRefreshToken, refreshToken);

export default router;
