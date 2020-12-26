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
import paginationUtil from '../utils/pagination.util';

export {
  getDepartmentService,
  createDepartmentService,
  getDepartmentsService,
  updateDepartmentService,
  deleteDepartmentService,
};

const getDepartmentsService = async (queryString) => {
  try {
    const { page, limit } = queryString;

    const totalDoc = await findLength(Department, {});
    const totalPage = Math.ceil(totalDoc / limit);
    if (page > totalPage) {
      throw new ErrorHandler(404, 'Page not found', 'INVALID');
    }
    const { startIndex, perPage } = paginationUtil(page, limit);
    const record = await findMany(
      Department,
      {},
      'name description createdAt',
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

const getDepartmentService = async (id) => {
  try {
    const populate = [
      { path: 'techStacksId', select: 'name status' },
      { path: 'projectsId', select: 'name' },
      { path: 'staffsId', select: 'name' },
    ];
    const record = await findOne(
      Department,
      { _id: id },
      '-__v -updatedAt',
      populate
    );
    if (!record) {
      throw new ErrorHandler(404, 'Department not exists', 'INVALID');
    }
    return handleResponse(200, 'Get data successfully', 'SUCCEED', { record });
  } catch (error) {
    throw error;
  }
};

const createDepartmentService = async (payload) => {
  try {
    await compareDepartmentData(payload);
    const record = await insert(Department, payload);
    const response = handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY',
      { recordId: record._id }
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
      await compareDepartmentData(update, id);
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

    return handleResponse(200, 'Update data successfully', 'SUCCEED');
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
    return handleResponse(200, 'Delete data successfully', 'SUCCEED');
  } catch (error) {
    throw error;
  }
};

const compareDepartmentData = async (payload, id) => {
  try {
    const { name, staffsId = [], projectsId = [], techStacksId = [] } = payload;
    const deptRecord = await findOne(Department, { name }, 'id');
    if (deptRecord && deptRecord.id !== id) {
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
