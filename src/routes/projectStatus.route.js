import express from 'express';
import {
  createProjectStatus,
  getProjectStatus,
  getProjectStatuses,
  updateProjectStatus,
  deleteProjectStatus,
} from '../controllers/projectStatus.controller';
import { bearerToken } from '../middlewares';

const router = express.Router();

router.use(bearerToken);

router
  .route('/project-statuses')
  .get(getProjectStatuses)
  .post(createProjectStatus)
  .put()
  .delete();

router
  .route('/project-statuses/:id')
  .get(getProjectStatus)
  .put(updateProjectStatus)
  .delete(deleteProjectStatus);

export default router;
