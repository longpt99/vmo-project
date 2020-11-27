import express from 'express';
import {
  createTech,
  deleteTech,
  getTechList,
  updateTech,
  getTechDetail,
} from '../controllers/techController';
import { bearerToken } from '../middlewares';

const router = express.Router();

// router.use(bearerToken);

router.route('/techs').get(getTechList).post(createTech).put().delete();

router
  .route('/techs/:id')
  .get(getTechDetail)
  .put(updateTech)
  .delete(deleteTech);

export default router;
