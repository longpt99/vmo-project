import express from 'express';
import { bearerToken, roleHandler, verifyRequest } from '../middlewares';

import {
  createDepartment,
  getDepartmentDetail,
  getDepartmentList,
  updateDepartment,
  deleteDepartment,
} from '../controllers/department.controller';

const router = express.Router();

router.use('/departments', bearerToken);

router
  .route('/departments')
  .get(roleHandler, getDepartmentList)
  .post(roleHandler, verifyRequest, createDepartment);

router
  .route('/departments/:id')
  .get(roleHandler, getDepartmentDetail)
  .put(roleHandler, verifyRequest, updateDepartment)
  .delete(roleHandler, deleteDepartment);

export default router;
