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
    const record = await findMany(Permission, {});
    return handleResponse(
      200,
      'Get data successfully',
      'GET_DATA_SUCCESSFULLY',
      record
    );
  } catch (error) {
    throw error;
  }
};

const getPermissionService = async (id) => {
  try {
    const record = await findOne(Permission, { _id: id });
    if (!record) {
      throw new ErrorHandler(404, 'Permission not exists', 'INVALID');
    }
    return handleResponse(
      200,
      'Get data successfully',
      'GET_DATA_SUCCESSFULLY',
      { record }
    );
  } catch (error) {
    throw error;
  }
};

const createPermissionService = async (payload) => {
  try {
    const { name } = payload;
    const record = await findOne(Permission, { name }, 'id');

    if (record) {
      throw new ErrorHandler(404, 'Permission already exists', 'INVALID');
    }

    await insert(Permission, payload);
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
    const record = await findOne(Permission, { _id: id });
    if (!record) {
      throw new ErrorHandler(404, 'Permission not exists', 'INVALID');
    }
    await updateOne(Permission, { _id: id }, { $set: payload });
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};

const deletePermissionService = async (id, staffId) => {
  try {
    const record = await findOne(Permission, { _id: id }, 'routes._id');
    const routesId = [];
    record.routes.forEach((item) => routesId.push(item._id));
    if (!record) {
      throw new ErrorHandler(404, 'Tech stack not exists', 'INVALID');
    }
    await Promise.all([
      deleteOne(Permission, { _id: id }),
      updateMany(Role, { staffId }, { $pull: { permsId: { $in: routesId } } }),
    ]);
    return handleResponse(
      200,
      'Delete data successfully',
      'DELETE_DATA_SUCCESSFULLY',
      { routesId }
    );
  } catch (error) {
    throw error;
  }
};
