import express from 'express';
import {
  getPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
} from '../controllers/permission.controller';
import { bearerToken, verifyRequest } from '../middlewares';

const router = express.Router();

router.use('/permissions', bearerToken);

router.route('/permissions').get(getPermissions).post(createPermission);

router
  .route('/permissions/:id')
  .get(getPermission)
  .put(updatePermission)
  .delete(deletePermission);

export default router;
