import express from 'express';
import { bearerToken, verifyRequest } from '../middlewares';
import {
  getCustomerList,
  createCustomer,
  getCustomerDetail,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customer.controller';

const router = express.Router();

router.use('/customers', bearerToken);

router
  .route('/customers')
  .get(getCustomerList)
  .post(verifyRequest, createCustomer);

router
  .route('/customers/:id')
  .get(getCustomerDetail)
  .put(verifyRequest, updateCustomer)
  .delete(deleteCustomer);

export default router;
