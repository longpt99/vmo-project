import express from 'express';
import {
  createProjectStatus,
  getProjectStatus,
  getProjectStatuses,
  updateProjectStatus,
  deleteProjectStatus,
} from '../controllers/projectStatus.controller';
import { bearerToken, verifyRequest } from '../middlewares';

const router = express.Router();

router.use('/project-statuses', bearerToken);

router
  .route('/project-statuses')
  .get(getProjectStatuses)
  .post(verifyRequest, createProjectStatus);

router
  .route('/project-statuses/:id')
  .get(getProjectStatus)
  .put(verifyRequest, updateProjectStatus)
  .delete(deleteProjectStatus);

export default router;
