import { handleError, handleResponse } from '../helpers/response';
import { ProjectType } from '../models';
import { findOne, findMany, updateOne, deleteOne } from './commonQuery.service';

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
    return handleError(error);
  }
};

const getProjectTypeService = async (id) => {
  try {
    const record = await findOne(ProjectType, { _id: id });
    if (record instanceof ErrorHandler) {
      throw record;
    }
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

const createProjectTypeService = async (payload) => {
  try {
    const { name, description, priorityPoint, status } = payload;
    await createOne(ProjectType, { name, description, priorityPoint, status });
    return handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    return handleError(error);
  }
};

const updateProjectTypeService = async (id, payload) => {
  try {
    await findOne(ProjectType, { _id: id }, 'id');
    await updateOne(
      ProjectType,
      {
        _id: id,
      },
      {
        $set: {
          ...payload,
        },
      }
    );
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteProjectTypeService = async (id) => {
  try {
    await findOne(ProjectType, { _id: id }, 'id');
    await deleteOne(ProjectType, { _id: id });
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    return handleError(error);
  }
};
