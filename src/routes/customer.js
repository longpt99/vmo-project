import express from 'express';
import { bearerToken } from '../middlewares';
import {
  getCustomerList,
  createCustomer,
  getCustomerDetail,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customerController';

const router = express.Router();

router.use('/customers', bearerToken);

router.route('/customers').get(getCustomerList).post(createCustomer);

router
  .route('/customers/:id')
  .get(getCustomerDetail)
  .put(updateCustomer)
  .delete(deleteCustomer);

export default router;
