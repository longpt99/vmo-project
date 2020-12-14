import express from 'express';
import {
  getProjectTypes,
  createProjectType,
  getProjectTypeDetail,
  updateProjectType,
  deleteProjectType,
} from '../controllers/projectType.controller';
import { bearerToken, verifyRequest } from '../middlewares';

const router = express.Router();

router.use('/project-types', bearerToken);

router
  .route('/project-types')
  .get(getProjectTypes)
  .post(verifyRequest, createProjectType);

router
  .route('/project-types/:id')
  .get(getProjectTypeDetail)
  .put(verifyRequest, updateProjectType)
  .delete(deleteProjectType);

export default router;
