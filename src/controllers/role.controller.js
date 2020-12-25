import { Role } from '../models';
import {
  createRoleService,
  deleteRoleService,
  getRoleService,
  getRolesService,
  updateRoleService,
} from '../services/role.service';

export { getRoles, getRole, createRole, updateRole, deleteRole };

const getRoles = async (req, res, next) => {
  try {
    const response = await getRolesService();
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const getRole = async (req, res, next) => {
  try {
    const response = await getRoleService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const createRole = async (req, res, next) => {
  try {
    // const response = await createRoleService(req.body);
    console.log(req.body);
    await Role.create(req.body);
    res.json('Success');
    // return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const response = await updateRoleService(req.params.id, req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const response = await deleteRoleService(
      req.params.id,
      res.locals.personalId
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};
