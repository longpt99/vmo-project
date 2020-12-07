import { handleError } from '../helpers/response';
import { TechStack } from '../models';
import { findOne, findMany, updateOne, deleteOne } from './commonQuery.service';

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
    return handleError(error);
  }
};

const getTechStackService = async (id) => {
  try {
    const record = await findOne(TechStack, { _id: id });
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

const createTechStackService = async () => {
  try {
  } catch (error) {
    return handleError(error);
  }
};

const updateTechStackService = async (id, payload) => {
  try {
    await findOne(TechStack, { _id: id });
    await updateOne(
      TechStack,
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

const deleteTechStackService = async (id) => {
  try {
    await findOne(TechStack, { _id: id });
    await deleteOne(TechStack, { _id: id });
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    return handleError(error);
  }
};
