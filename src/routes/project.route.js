import express from 'express';
import {
  createProject,
  getProjectDetail,
  getProjectList,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';
import { bearerToken, roleHandler, verifyRequest } from '../middlewares';

const router = express.Router();

router.use('/projects', bearerToken);

router
  .route('/projects')
  .get(roleHandler, getProjectList)
  .post(roleHandler, verifyRequest, createProject);

router
  .route('/projects/:id')
  .get(roleHandler, getProjectDetail)
  .put(roleHandler, verifyRequest, updateProject)
  .delete(roleHandler, deleteProject);

export default router;
