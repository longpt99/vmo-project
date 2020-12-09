import express from 'express';
import {
  createStaff,
  deleteStaff,
  getStaffDetail,
  getStaffList,
  updateStaff,
} from '../controllers/staff.controller';
import { bearerToken, verifyRequest } from '../middlewares';

const router = express.Router();

router.use('/staffs', bearerToken);

router.route('/staffs').get(getStaffList).post(verifyRequest, createStaff);

router
  .route('/staffs/:id')
  .get(getStaffDetail)
  .put(updateStaff)
  .delete(deleteStaff);

export default router;
