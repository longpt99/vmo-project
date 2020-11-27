import express from 'express';
import { bearerToken } from '../middlewares';

import {
  createOffice,
  getOfficeDetail,
  getOfficeList,
} from '../controllers/officeController';

const router = express.Router();

// router.use(bearerToken);

router.route('/offices').get(getOfficeList).post(createOffice).put().delete();

router.route('/offices/:id').get(getOfficeDetail).post().put().delete();

export default router;
