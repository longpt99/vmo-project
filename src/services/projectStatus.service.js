import { ErrorHandler, handleResponse } from '../helpers/response.helper';
import { Project, ProjectStatus } from '../models';
import {
  findOne,
  findMany,
  updateOne,
  deleteOne,
  insert,
  updateMany,
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
    throw error;
  }
};

const getProjectStatusService = async (id) => {
  try {
    const record = await findOne(ProjectStatus, { _id: id });
    if (!record) {
      throw new ErrorHandler(404, 'Project status not exists', 'INVALID');
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

const createProjectStatusService = async (payload) => {
  try {
    const { name } = payload;
    const record = await findOne(ProjectStatus, { name }, 'id');
    if (record) {
      throw new ErrorHandler(
        404,
        `Project status "${name}" already exists`,
        'INVALID'
      );
    }
    await insert(ProjectStatus, payload);
    return handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};

const updateProjectStatusService = async (id, payload) => {
  try {
    const record = await findOne(ProjectStatus, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Project status not exists', 'INVALID');
    }
    const { name } = payload;
    const projectStatusRecord = await findOne(ProjectStatus, { name }, 'id');
    if (projectStatusRecord && projectStatusRecord.id !== id) {
      throw new ErrorHandler(
        404,
        `Project status "${name}" already exists`,
        'INVALID'
      );
    }
    await updateOne(ProjectStatus, { _id: id }, { $set: payload });
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};

const deleteProjectStatusService = async (id) => {
  try {
    const record = await findOne(ProjectStatus, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Project status not exists', 'INVALID');
    }
    await Promise.all([
      deleteOne(ProjectStatus, { _id: id }),
      updateMany(
        Project,
        { projectStatusId: id },
        { $set: { projectStatusId: null } }
      ),
    ]);
    return handleResponse(
      200,
      'Delete data successfully',
      'DELETE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};
