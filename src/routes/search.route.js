import express from 'express';
import { getSearch } from '../controllers/searchController';
import { bearerToken } from '../middlewares';

const router = express.Router();

router.use(bearerToken);

router.route('/search').get(getSearch);

export default router;
