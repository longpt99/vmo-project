import { handleResponse, ErrorHandler } from '../helpers/response.helper';
import { Project, ProjectType } from '../models';
import paginationUtil from '../utils/pagination.util';
import {
  findOne,
  findMany,
  updateOne,
  deleteOne,
  insert,
  updateMany,
  findLength,
  findManyWithPag,
} from './commonQuery.service';

export {
  getProjectTypesService,
  getProjectTypeService,
  createProjectTypeService,
  updateProjectTypeService,
  deleteProjectTypeService,
};

const getProjectTypesService = async (queryString) => {
  try {
    const { page, limit } = queryString;
    const totalDoc = await findLength(ProjectType, {});
    const totalPage = Math.ceil(totalDoc / limit);
    if (page > totalPage) {
      throw new ErrorHandler(404, 'Page not found', 'INVALID');
    }
    const { startIndex, perPage } = paginationUtil(page, limit);
    const record = await findManyWithPag(
      ProjectType,
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

const getProjectTypeService = async (id) => {
  try {
    const record = await findOne(ProjectType, { _id: id });
    if (!record) {
      throw new ErrorHandler(404, 'Project type not exists', 'INVALID');
    }
    return handleResponse(200, 'Get data successfully', 'SUCCEED', { record });
  } catch (error) {
    throw error;
  }
};

const createProjectTypeService = async (payload) => {
  try {
    const { name } = payload;
    const record = await findOne(ProjectType, { name }, 'id');
    if (record) {
      throw new ErrorHandler(404, `Project type already exists`, 'INVALID');
    }
    await insert(ProjectType, payload);
    return handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};

const updateProjectTypeService = async (id, payload) => {
  try {
    const record = await findOne(ProjectType, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Project type not exists', 'INVALID');
    }
    const { name } = payload;
    const projectTypeRecord = await findOne(ProjectType, { name }, 'id');
    if (projectTypeRecord && projectTypeRecord.id !== id) {
      throw new ErrorHandler(404, `Project type already exists`, 'INVALID');
    }
    await updateOne(ProjectType, { _id: id }, { $set: payload });
    return handleResponse(200, 'Update data successfully', 'SUCCEED');
  } catch (error) {
    throw error;
  }
};

const deleteProjectTypeService = async (id) => {
  try {
    const record = await findOne(ProjectType, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Project type not exists', 'INVALID');
    }
    await Promise.all([
      deleteOne(ProjectType, { _id: id }),
      updateMany(
        Project,
        { projectTypesId: id },
        { $pull: { projectTypesId: id } }
      ),
    ]);
    return handleResponse(200, 'Delete data successfully', 'SUCCEED');
  } catch (error) {
    throw error;
  }
};
