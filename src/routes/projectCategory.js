import express from 'express';
import {
  getProjectCategories,
  createProjectCategory,
  getProjectCategoryDetail,
  updateProjectCategory,
  deleteProjectCategory,
} from '../controllers/projectCategoryController';
import { bearerToken } from '../middlewares';

const router = express.Router();

router.use('/project-categories', bearerToken);

router
  .route('/project-categories')
  .get(getProjectCategories)
  .post(createProjectCategory);

router
  .route('/project-categories/:id')
  .get(getProjectCategoryDetail)
  .put(updateProjectCategory)
  .delete(deleteProjectCategory);

export default router;
