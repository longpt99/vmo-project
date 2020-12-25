import { handleResponse, ErrorHandler } from '../helpers/response.helper';
import { Project, Role } from '../models';
import paginationUtil from '../utils/pagination.util';
import {
  findOne,
  findMany,
  updateOne,
  deleteOne,
  insert,
  updateMany,
  findLength,
} from './commonQuery.service';

export {
  getRolesService,
  getRoleService,
  createRoleService,
  updateRoleService,
  deleteRoleService,
};

const getRolesService = async () => {
  try {
    const record = await findMany(Role, {}, 'roleName');
    return handleResponse(200, 'Get data successfully', 'SUCCEED', record);
  } catch (error) {
    throw error;
  }
};

const getRoleService = async (id) => {
  try {
    const record = await findOne(Role, { _id: id });
    if (!record) {
      throw new ErrorHandler(404, 'Project type not exists', 'INVALID');
    }
    return handleResponse(200, 'Get data successfully', 'SUCCEED', { record });
  } catch (error) {
    throw error;
  }
};

const createRoleService = async (payload) => {
  try {
    const { name } = payload;
    const record = await findOne(Role, { name }, 'id');
    if (record) {
      throw new ErrorHandler(404, `Project type already exists`, 'INVALID');
    }
    await insert(Role, payload);
    return handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};

const updateRoleService = async (id, payload) => {
  try {
    const record = await findOne(Role, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Project type not exists', 'INVALID');
    }
    const { name } = payload;
    const RoleRecord = await findOne(Role, { name }, 'id');
    if (RoleRecord && RoleRecord.id !== id) {
      throw new ErrorHandler(404, `Project type already exists`, 'INVALID');
    }
    await updateOne(Role, { _id: id }, { $set: payload });
    return handleResponse(200, 'Update data successfully', 'SUCCEED');
  } catch (error) {
    throw error;
  }
};

const deleteRoleService = async (id) => {
  try {
    const record = await findOne(Role, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Project type not exists', 'INVALID');
    }
    await Promise.all([
      deleteOne(Role, { _id: id }),
      updateMany(Project, { RolesId: id }, { $pull: { RolesId: id } }),
    ]);
    return handleResponse(200, 'Delete data successfully', 'SUCCEED');
  } catch (error) {
    throw error;
  }
};
