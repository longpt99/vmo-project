import express from 'express';
import {
  createStaff,
  deleteStaff,
  getStaffDetail,
  getStaffList,
  updateStaff,
  updateStaffExp,
  updateStaffRole,
  getStaffSearch,
  getStaffReport,
} from '../controllers/staff.controller';
import { bearerToken, roleHandler, verifyRequest } from '../middlewares';

const router = express.Router();

router.use('/staffs', bearerToken);

router
  .route('/staffs')
  .get(roleHandler, getStaffList)
  .post(roleHandler, verifyRequest, createStaff);

router.route('/staffs/search').get(roleHandler, getStaffSearch);

router.route('/staffs/report').get(roleHandler, getStaffReport);

router
  .route('/staffs/:id')
  .get(roleHandler, getStaffDetail)
  .put(roleHandler, verifyRequest, updateStaff)
  .delete(roleHandler, deleteStaff);

router.route('/staffs/:id/exp').put(roleHandler, verifyRequest, updateStaffExp);

router
  .route('/staffs/:id/roles')
  .put(roleHandler, verifyRequest, updateStaffRole);

export default router;
