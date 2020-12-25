import { ErrorHandler, handleResponse } from '../helpers/response.helper';
import { Permission, Role } from '../models';
import {
  findOne,
  findMany,
  updateOne,
  deleteOne,
  insert,
  updateMany,
} from './commonQuery.service';

export {
  getPermissionsService,
  getPermissionService,
  createPermissionService,
  updatePermissionService,
  deletePermissionService,
};

const getPermissionsService = async () => {
  try {
    const record = await findMany(Permission, {}, '-__v -updatedAt -createdAt');
    return handleResponse(200, 'Get data successfully', 'SUCCEED', record);
  } catch (error) {
    throw error;
  }
};

const getPermissionService = async (id) => {
  try {
    const record = await findOne(
      Permission,
      { _id: id },
      '-__v -updatedAt -createdAt'
    );
    if (!record) {
      throw new ErrorHandler(404, 'Permission not exists', 'INVALID');
    }
    return handleResponse(200, 'Get data successfully', 'SUCCEED', { record });
  } catch (error) {
    throw error;
  }
};

const createPermissionService = async (payload) => {
  try {
    const { name } = payload;
    const lenRecord = await findMany(Permission, { name });
    if (lenRecord) {
      throw new ErrorHandler(404, 'Permission already exists', 'INVALID');
    }
    await insert(Permission, perms);
    return handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};

const updatePermissionService = async (id, payload) => {
  try {
    const lenRecord = await findMany(Permission, { _id: id });
    if (!lenRecord) {
      throw new ErrorHandler(404, 'Permission not exists', 'INVALID');
    }
    await updateOne(Permission, { _id: id }, { $set: payload });
    return handleResponse(200, 'Update data successfully', 'SUCCEED');
  } catch (error) {
    throw error;
  }
};

const deletePermissionService = async (id) => {
  try {
    const lenRecord = await findMany(Permission, { _id: id });
    if (!lenRecord) {
      throw new ErrorHandler(404, 'Permission not exists', 'INVALID');
    }
    await Promise.all([
      deleteOne(Permission, { _id: id }),
      updateMany(Role, { permsId: id }, { $pull: { permsId: id } }),
    ]);
    return handleResponse(200, 'Delete data successfully', 'SUCCEED');
  } catch (error) {
    throw error;
  }
};
