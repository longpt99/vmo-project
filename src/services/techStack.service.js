import { ErrorHandler, handleResponse } from '../helpers/response.helper';
import { Department, Project, StaffExp, TechStack } from '../models';
import {
  findOne,
  findMany,
  updateOne,
  deleteOne,
  insert,
  updateMany,
} from './commonQuery.service';

export {
  getTechStacksService,
  getTechStackService,
  createTechStackService,
  updateTechStackService,
  deleteTechStackService,
};

const getTechStacksService = async () => {
  try {
    const record = await findMany(TechStack, {});
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

const getTechStackService = async (id) => {
  try {
    const record = await findOne(TechStack, { _id: id });
    if (!record) {
      throw new ErrorHandler(404, 'Tech stack not exists', 'INVALID');
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
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
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
    return handleResponse(
      200,
      'Delete data successfully',
      'DELETE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};
