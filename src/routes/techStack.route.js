import express from 'express';
import {
  createTechStack,
  deleteTechStack,
  getTechStackList,
  updateTechStack,
  getTechStackDetail,
} from '../controllers/techStack.controller';
import { bearerToken } from '../middlewares';

const router = express.Router();

router.use('/tech-stacks', bearerToken);

router.route('/tech-stacks').get(getTechStackList).post(createTechStack);

router
  .route('/tech-stacks/:id')
  .get(getTechStackDetail)
  .put(updateTechStack)
  .delete(deleteTechStack);

export default router;
