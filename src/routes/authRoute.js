import express from 'express';
import { verifyRefreshToken, verifyRequest } from '../middlewares';
const router = express.Router();

router.route('/auth/login').post(verifyRequest);

router.route('/auth/refresh-token').post(verifyRefreshToken);

export default router;
