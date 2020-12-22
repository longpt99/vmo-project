import { handleResponse, ErrorHandler } from '../helpers/response.helper';
import { Project, ProjectType } from '../models';
import {
  findOne,
  findMany,
  updateOne,
  deleteOne,
  insert,
  updateMany,
} from './commonQuery.service';

export {
  getProjectTypesService,
  getProjectTypeService,
  createProjectTypeService,
  updateProjectTypeService,
  deleteProjectTypeService,
};

const getProjectTypesService = async () => {
  try {
    const record = await findMany(ProjectType, {});
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

const getProjectTypeService = async (id) => {
  try {
    const record = await findOne(ProjectType, { _id: id });
    if (!record) {
      throw new ErrorHandler(404, 'Project type not exists', 'INVALID');
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

const createProjectTypeService = async (payload) => {
  try {
    const { name } = payload;
    const record = await findOne(ProjectType, { name }, 'id');
    if (record) {
      throw new ErrorHandler(
        404,
        `Project type "${name}" already exists`,
        'INVALID'
      );
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
      throw new ErrorHandler(
        404,
        `Project type "${name}" already exists`,
        'INVALID'
      );
    }
    await updateOne(ProjectType, { _id: id }, { $set: payload });
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
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
    return handleResponse(
      200,
      'Delete data successfully',
      'DELETE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};
