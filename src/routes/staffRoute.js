import express from 'express';
import { createStaff, getStaffList } from '../controllers/staffController';
import { bearerToken } from '../middlewares';

const router = express.Router();

// router.use(bearerToken);

router.route('/staffs').get(getStaffList).post(createStaff).put().delete();

router.route('/staffs/:id').get().post().put().delete();

export default router;
