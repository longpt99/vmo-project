import express from 'express';
import {
  getProjectTypes,
  createProjectType,
  getProjectTypeDetail,
  updateProjectType,
  deleteProjectType,
} from '../controllers/projectType.controller';
import { bearerToken, roleHandler, verifyRequest } from '../middlewares';

const router = express.Router();

router.use('/project-types', bearerToken);

router
  .route('/project-types')
  .get(roleHandler, getProjectTypes)
  .post(roleHandler, verifyRequest, createProjectType);

router
  .route('/project-types/:id')
  .get(roleHandler, getProjectTypeDetail)
  .put(roleHandler, verifyRequest, updateProjectType)
  .delete(roleHandler, deleteProjectType);

export default router;
