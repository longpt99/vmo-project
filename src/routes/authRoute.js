import express from 'express';
// import { verifyRefreshToken, verifyRequest } from '../middlewares';
const router = express.Router();

router.route('/auth/login').post();

router.route('/auth/refresh-token').post();

export default router;
