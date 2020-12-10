import { ErrorHandler, handleError, handleResponse } from '../helpers/response';
import { ProjectStatus } from '../models';
import {
  findOne,
  findMany,
  updateOne,
  deleteOne,
  insert,
} from './commonQuery.service';

export {
  getProjectStatusesService,
  getProjectStatusService,
  createProjectStatusService,
  updateProjectStatusService,
  deleteProjectStatusService,
};

const getProjectStatusesService = async () => {
  try {
    const record = await findMany(ProjectStatus, {});
    return handleResponse(
      200,
      'Get data successfully',
      'GET_DATA_SUCCESSFULLY',
      record
    );
  } catch (error) {
    return handleError(error);
  }
};

const getProjectStatusService = async (id) => {
  try {
    const record = await findOne(ProjectStatus, { _id: id });
    return handleResponse(
      200,
      'Get data successfully',
      'GET_DATA_SUCCESSFULLY',
      { record }
    );
  } catch (error) {
    return handleError(error);
  }
};

const createProjectStatusService = async (payload) => {
  try {
    const { name } = payload;
    const record = await findOne(ProjectStatus, { name }, 'id');
    if (record) {
      throw new ErrorHandler(404, 'Project status already exists', 'INVALID');
    }
    await insert(ProjectStatus, payload);
    return handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    return handleError(error);
  }
};

const updateProjectStatusService = async (id, payload) => {
  try {
    const record = await findOne(ProjectStatus, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Project status not exists', 'INVALID');
    }
    await updateOne(ProjectStatus, { _id: id }, { $set: payload });
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteProjectStatusService = async (id) => {
  try {
    const record = await findOne(ProjectStatus, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Project status not exists', 'INVALID');
    }
    await deleteOne(ProjectStatus, { _id: id });
    return handleResponse(
      200,
      'Delete data successfully',
      'DELETE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    return handleError(error);
  }
};
