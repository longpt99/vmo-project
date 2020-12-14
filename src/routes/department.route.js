import express from 'express';
import { bearerToken, verifyRequest } from '../middlewares';

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
  .get(getDepartmentList)
  .post(verifyRequest, createDepartment);

router
  .route('/departments/:id')
  .get(getDepartmentDetail)
  .put(verifyRequest, updateDepartment)
  .delete(deleteDepartment);

export default router;
