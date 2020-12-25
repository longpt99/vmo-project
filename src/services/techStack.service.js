import { ErrorHandler, handleResponse } from '../helpers/response.helper';
import { Department, Project, StaffExp, TechStack } from '../models';
import paginationUtil from '../utils/pagination.util';
import {
  findOne,
  findMany,
  updateOne,
  deleteOne,
  insert,
  updateMany,
  findManyWithPag,
  findLength,
} from './commonQuery.service';

export {
  getTechStacksService,
  getTechStackService,
  createTechStackService,
  updateTechStackService,
  deleteTechStackService,
};

const getTechStacksService = async (queryString) => {
  try {
    const { page, limit } = queryString;

    const totalDoc = await findLength(TechStack, {});
    const totalPage = Math.ceil(totalDoc / limit);

    if (page > totalPage) {
      throw new ErrorHandler(404, 'Page not found', 'INVALID');
    }

    const { startIndex, perPage } = paginationUtil(page, limit);
    const record = await findManyWithPag(
      TechStack,
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

const getTechStackService = async (id) => {
  try {
    const record = await findOne(TechStack, { _id: id });
    if (!record) {
      throw new ErrorHandler(404, 'Tech stack not exists', 'INVALID');
    }
    return handleResponse(200, 'Get data successfully', 'SUCCEED', { record });
  } catch (error) {
    throw error;
  }
};

const createTechStackService = async (payload) => {
  try {
    const { name } = payload;
    const record = await findOne(TechStack, { name }, 'id');
    if (record) {
      throw new ErrorHandler(404, `Tech stack already exists`, 'INVALID');
    }
    await insert(TechStack, payload);
    return handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};

const updateTechStackService = async (id, payload) => {
  try {
    const record = await findOne(TechStack, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Tech stack not exists', 'INVALID');
    }
    const { name } = payload;
    const techStackRecord = await findOne(TechStack, { name }, 'id');
    if (techStackRecord && techStackRecord.id !== id) {
      throw new ErrorHandler(404, `Tech stack already exists`, 'INVALID');
    }
    await updateOne(TechStack, { _id: id }, { $set: payload });
    return handleResponse(200, 'Update data successfully', 'SUCCEED');
  } catch (error) {
    throw error;
  }
};

const deleteTechStackService = async (id) => {
  try {
    const record = await findOne(TechStack, { _id: id });
    if (!record) {
      throw new ErrorHandler(404, 'Tech stack not exists', 'INVALID');
    }
    await Promise.all([
      deleteOne(TechStack, { _id: id }),
      updateMany(
        Project,
        { techStacksId: id },
        { $pull: { techStacksId: id } }
      ),
      updateMany(
        Department,
        { techStacksId: id },
        { $pull: { techStacksId: id } }
      ),
      updateMany(
        StaffExp,
        { 'skills.techStackId': id },
        { $pull: { skills: { techStackId: id } } }
      ),
    ]);
    return handleResponse(200, 'Delete data successfully', 'SUCCEED');
  } catch (error) {
    throw error;
  }
};
