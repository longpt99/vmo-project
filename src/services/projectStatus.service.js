import { ErrorHandler, handleResponse } from '../helpers/response.helper';
import { Project, ProjectStatus } from '../models';
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
  getProjectStatusesService,
  getProjectStatusService,
  createProjectStatusService,
  updateProjectStatusService,
  deleteProjectStatusService,
};

const getProjectStatusesService = async (queryString) => {
  try {
    const { page, limit } = queryString;

    const totalDoc = await findLength(ProjectStatus, {});
    const totalPage = Math.ceil(totalDoc / limit);
    if (page > totalPage) {
      throw new ErrorHandler(404, 'Page not found', 'INVALID');
    }
    const { startIndex, perPage } = paginationUtil(page, limit);
    const record = await findMany(
      ProjectStatus,
      {},
      '-createdAt -updatedAt -__v',
      startIndex,
      perPage
    );
    return handleResponse(200, 'Get data successfully', 'SUCCEED', {
      record,
      totalDoc,
      startIndex,
    });
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
    return handleResponse(200, 'Get data successfully', 'SUCCEED', { record });
  } catch (error) {
    throw error;
  }
};

const createProjectStatusService = async (payload) => {
  try {
    const { name } = payload;
    const record = await findOne(ProjectStatus, { name }, 'id');
    if (record) {
      throw new ErrorHandler(404, `Project status already exists`, 'INVALID');
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
      throw new ErrorHandler(404, `Project status already exists`, 'INVALID');
    }
    await updateOne(ProjectStatus, { _id: id }, { $set: payload });
    return handleResponse(200, 'Update data successfully', 'SUCCEED');
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
    return handleResponse(200, 'Delete data successfully', 'SUCCEED');
  } catch (error) {
    throw error;
  }
};
