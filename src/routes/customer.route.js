import express from 'express';
import { bearerToken, roleHandler, verifyRequest } from '../middlewares';
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
  .get(roleHandler, getCustomerList)
  .post(roleHandler, verifyRequest, createCustomer);

router
  .route('/customers/:id')
  .get(roleHandler, getCustomerDetail)
  .put(roleHandler, verifyRequest, updateCustomer)
  .delete(roleHandler, deleteCustomer);

export default router;
