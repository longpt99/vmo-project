import express from 'express';
import {
  createProject,
  getProjectDetail,
  getProjectList,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';
import { bearerToken, verifyRequest } from '../middlewares';

const router = express.Router();

router.use('/projects', bearerToken);

router
  .route('/projects')
  .get(getProjectList)
  .post(verifyRequest, createProject);

router
  .route('/projects/:id')
  .get(getProjectDetail)
  .put(verifyRequest, updateProject)
  .delete(deleteProject);

export default router;
