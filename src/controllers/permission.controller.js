import {
  createPermissionService,
  deletePermissionService,
  getPermissionService,
  getPermissionsService,
  updatePermissionService,
} from '../services/permission.service';

export {
  getPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
};

const getPermissions = async (req, res, next) => {
  try {
    const response = await getPermissionsService();
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const getPermission = async (req, res, next) => {
  try {
    const response = await getPermissionService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const createPermission = async (req, res, next) => {
  try {
    const response = await createPermissionService(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const updatePermission = async (req, res, next) => {
  try {
    const response = await updatePermissionService(req.params.id, req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const deletePermission = async (req, res, next) => {
  try {
    const response = await deletePermissionService(
      req.params.id,
      res.locals.personalId
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};
