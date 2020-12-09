import express from 'express';
import {
  createProject,
  getProjectDetail,
  getProjectList,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';
import { bearerToken } from '../middlewares';

const router = express.Router();

router.use(bearerToken);

router
  .route('/projects')
  .get(getProjectList)
  .post(createProject)
  .put()
  .delete();

router
  .route('/projects/:id')
  .get(getProjectDetail)
  .put(updateProject)
  .delete(deleteProject);

export default router;
