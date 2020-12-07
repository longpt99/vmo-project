import { ErrorHandler, handleError, handleResponse } from '../helpers/response';
import { Department, Project, Staff, TechStack } from '../models';
import { findOne, findMany, updateOne, deleteOne } from './commonQuery.service';

export {
  getDepartmentService,
  createDepartmentService,
  getDepartmentsService,
  updateDepartmentService,
  deleteDepartmentService,
};

const getDepartmentsService = async () => {
  try {
    const record = await findMany(Department, {});
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

const getDepartmentService = async (id) => {
  try {
    const record = await findOne(Department, { _id: id });
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

const createDepartmentService = async (payload) => {
  try {
    const { name, description, staffsId, projectsId, techStacksId } = payload;
    const techStacksRecord = await findMany(
      TechStack,
      {
        _id: {
          $in: techStacksId,
        },
      },
      'id'
    );

    if (len(techStacksRecord) < len(techStacksId)) {
      throw new ErrorHandler(400, 'Invalid', 'INVALID');
    }

    const staffsRecord = await findMany(
      Staff,
      {
        _id: {
          $in: staffsId,
        },
      },
      'id'
    );

    if (len(staffsRecord) < len(staffsId)) {
      throw new ErrorHandler(400, 'Invalid', 'INVALID');
    }

    const projectsRecord = await findMany(
      Project,
      {
        _id: {
          $in: projectsId,
        },
      },
      'id'
    );

    if (len(projectsRecord) < len(projectsId)) {
      throw new ErrorHandler(400, 'Invalid', 'INVALID');
    }

    await create(Department, {
      name,
      description,
      staffsId,
      projectsId,
      techStacksId,
    });
    const response = handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY'
    );
    return response;
  } catch (error) {
    return handleError(error);
  }
};

const updateDepartmentService = async (id, payload) => {
  try {
    await findOne(Department, { _id: id });
    await updateOne(
      Department,
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

const deleteDepartmentService = async (id) => {
  try {
    await findOne(Department, { _id: id });
    await deleteOne(Department, { _id: id });
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    return handleError(error);
  }
};
