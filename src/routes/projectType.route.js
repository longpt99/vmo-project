import express from 'express';
import {
  getProjectTypes,
  createProjectType,
  getProjectTypeDetail,
  updateProjectType,
  deleteProjectType,
} from '../controllers/projectType.controller';
import { bearerToken } from '../middlewares';

const router = express.Router();

router.use('/project-Types', bearerToken);

router.route('/project-Types').get(getProjectTypes).post(createProjectType);

router
  .route('/project-Types/:id')
  .get(getProjectTypeDetail)
  .put(updateProjectType)
  .delete(deleteProjectType);

export default router;
