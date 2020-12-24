import express from 'express';
import {
  getPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
} from '../controllers/permission.controller';
import { bearerToken, roleHandler, verifyRequest } from '../middlewares';

const router = express.Router();

router.use('/permissions', bearerToken);

router
  .route('/permissions')
  .get(roleHandler, getPermissions)
  .post(roleHandler, createPermission);

router
  .route('/permissions/:id')
  .get(roleHandler, getPermission)
  .put(roleHandler, updatePermission)
  .delete(roleHandler, deletePermission);

export default router;
