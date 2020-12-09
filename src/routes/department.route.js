import express from 'express';
import { bearerToken } from '../middlewares';

import {
  createDepartment,
  getDepartmentDetail,
  getDepartmentList,
  updateDepartment,
  deleteDepartment,
} from '../controllers/department.controller';

const router = express.Router();

// router.use('/departments', bearerToken);
router.route('/departments').get(getDepartmentList).post(createDepartment);

router
  .route('/departments/:id')
  .get(getDepartmentDetail)
  .put(updateDepartment)
  .delete(deleteDepartment);

export default router;
