import { handleError, handleResponse } from '../helpers/response';
import { ProjectStatus } from '../models';
import {
  findOne,
  findMany,
  updateOne,
  deleteOne,
  insertOne,
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
    await insertOne(ProjectStatus, payload);
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
    await findOne(ProjectStatus, { _id: id });
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
    await findOne(ProjectStatus, { _id: id });
    await deleteOne(ProjectStatus, { _id: id });
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    return handleError(error);
  }
};
