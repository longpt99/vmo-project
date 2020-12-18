import { ErrorHandler, handleResponse } from '../helpers/response.helper';
import { Department, Project, Staff, TechStack } from '../models';
import {
  findOne,
  findMany,
  updateOne,
  deleteOne,
  insert,
  updateMany,
  findLength,
} from './commonQuery.service';

import len from '../utils/arrayLength.util';

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
    throw error;
  }
};

const getDepartmentService = async (id) => {
  try {
    const populate = [
      { path: 'techStacksId', select: 'name status' },
      { path: 'projectsId', select: 'name' },
      { path: 'staffsId', select: 'name' },
    ];
    const record = await findOne(Department, { _id: id }, '', populate);
    if (!record) {
      throw new ErrorHandler(404, 'Department not exists', 'INVALID');
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

const createDepartmentService = async (payload) => {
  try {
    await verifyDepartmentRequest(payload);
    await insert(Department, payload);
    const response = handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY'
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const updateDepartmentService = async (id, payload) => {
  try {
    const { update, remove } = payload;

    const record = await findOne(Department, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Department not exists', 'INVALID');
    }

    if (update) {
      await verifyDepartmentRequest(update);
      await updateOne(Department, { _id: id }, { $set: update });
      await updateMany(
        Project,
        { _id: { $in: update.projectsId }, departmentsId: { $ne: id } },
        { $push: { departmentsId: id } }
      );
    }

    if (remove) {
      await updateMany(
        Project,
        { _id: { $in: remove.projectsId } },
        { $pull: { departmentsId: id } }
      );
    }

    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};

const deleteDepartmentService = async (id) => {
  try {
    const record = await findOne(Department, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Department not exists', 'INVALID');
    }
    await Promise.all([
      deleteOne(Department, { _id: id }),
      updateMany(
        Project,
        { departmentsId: id },
        { $pull: { departmentsId: id } }
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

const verifyDepartmentRequest = async (payload) => {
  try {
    const { name, staffsId = [], projectsId = [], techStacksId = [] } = payload;

    const deptRecord = await findOne(Department, { name }, 'id');
    if (deptRecord) {
      throw new ErrorHandler(404, 'Department already exists', 'INVALID');
    }

    const techStacksAsync = findLength(
      TechStack,
      { _id: { $in: techStacksId } },
      'id'
    );
    const projectsAsync = findLength(
      Project,
      { _id: { $in: projectsId } },
      'id'
    );
    const staffsAsync = findLength(Staff, { _id: { $in: staffsId } }, 'id');
    const lenTechStacksRecord = await techStacksAsync;
    if (lenTechStacksRecord < len(techStacksId)) {
      throw new ErrorHandler(400, 'Tech stack error', 'INVALID');
    }
    const lenStaffsRecord = await staffsAsync;
    if (lenStaffsRecord < len(staffsId)) {
      throw new ErrorHandler(400, 'Staff error', 'INVALID');
    }
    const lenProjectsRecord = await projectsAsync;
    if (lenProjectsRecord < len(projectsId)) {
      throw new ErrorHandler(400, 'Invalid', 'INVALID');
    }
  } catch (error) {
    throw error;
  }
};
