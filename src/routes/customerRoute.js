import express from 'express';
import { bearerToken } from '../middlewares';
import {
  getCustomerList,
  createCustomer,
} from '../controllers/customerController';

const router = express.Router();

// router.use(bearerToken);

router
  .route('/customers')
  .get(getCustomerList)
  .post(createCustomer)
  .put()
  .delete();

router.route('/customers/:id').get().post().put().delete();

export default router;
