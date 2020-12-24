import express from 'express';
import {
  createProjectStatus,
  getProjectStatus,
  getProjectStatuses,
  updateProjectStatus,
  deleteProjectStatus,
} from '../controllers/projectStatus.controller';
import { bearerToken, roleHandler, verifyRequest } from '../middlewares';

const router = express.Router();

router.use('/project-statuses', bearerToken);

router
  .route('/project-statuses')
  .get(roleHandler, getProjectStatuses)
  .post(roleHandler, verifyRequest, createProjectStatus);

router
  .route('/project-statuses/:id')
  .get(roleHandler, getProjectStatus)
  .put(roleHandler, verifyRequest, updateProjectStatus)
  .delete(roleHandler, deleteProjectStatus);

export default router;
