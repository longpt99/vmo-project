import express from 'express';
import {
  createStaff,
  deleteStaff,
  getStaffDetail,
  getStaffList,
  updateStaff,
  updateStaffExp,
} from '../controllers/staff.controller';
import { bearerToken, verifyRequest } from '../middlewares';

const router = express.Router();

router.use('/staffs', bearerToken);

router.route('/staffs').get(getStaffList).post(verifyRequest, createStaff);

router
  .route('/staffs/:id')
  .get(getStaffDetail)
  .put(verifyRequest, updateStaff)
  .delete(deleteStaff);

router.route('/staffs/:id/exp').get().put(updateStaffExp);

export default router;
