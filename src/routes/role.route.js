import express from 'express';
import {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
} from '../controllers/role.controller';
import { bearerToken, roleHandler, verifyRequest } from '../middlewares';

const router = express.Router();

router.use('/roles', bearerToken);

router.route('/roles').get(roleHandler, getRoles).post(roleHandler, createRole);

router
  .route('/roles/:id')
  .get(roleHandler, getRole)
  .put(roleHandler, updateRole)
  .delete(roleHandler, deleteRole);

export default router;
