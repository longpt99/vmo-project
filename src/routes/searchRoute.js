import express from 'express';
import { getSearchResult } from '../controllers/searchController';
import { bearerToken } from '../middlewares';

const router = express.Router();

// router.use(bearerToken);

router.route('/search').get(getSearchResult).post().put().delete();

router.route('/staffs/:id').get().post().put().delete();

export default router;
