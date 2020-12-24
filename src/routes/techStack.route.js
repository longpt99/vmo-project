import express from 'express';
import {
  createTechStack,
  deleteTechStack,
  getTechStackList,
  updateTechStack,
  getTechStackDetail,
} from '../controllers/techStack.controller';
import { bearerToken, roleHandler, verifyRequest } from '../middlewares';

const router = express.Router();

router.use('/tech-stacks', bearerToken);

router
  .route('/tech-stacks')
  .get(roleHandler, getTechStackList)
  .post(roleHandler, verifyRequest, createTechStack);
router
  .route('/tech-stacks/:id')
  .get(roleHandler, getTechStackDetail)
  .put(roleHandler, verifyRequest, updateTechStack)
  .delete(roleHandler, deleteTechStack);

export default router;
