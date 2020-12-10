import express from 'express';
import { getSearch } from '../controllers/search.controller';
import { bearerToken } from '../middlewares';

const router = express.Router();

router.use('/search', bearerToken);

router.route('/search').get(getSearch);

export default router;
