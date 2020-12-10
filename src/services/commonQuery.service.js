import { ErrorHandler, handleError } from '../helpers/response';
export { findOne, findMany, insert, updateOne, deleteOne, updateMany };

const findOne = async (model, filter, projection = '') => {
  try {
    return await model.findOne(filter, projection);
  } catch (error) {
    throw error;
  }
};

const findMany = async (model, filter, projection = '') => {
  try {
    const record = await model.find(filter, projection);
    return record;
  } catch (error) {
    return error;
  }
};

const updateOne = async (model, filter, doc) => {
  try {
    return await model.updateOne(filter, doc);
  } catch (error) {
    throw error;
  }
};

const updateMany = async (model, filter, doc) => {
  try {
    await model.updateMany(filter, doc);
  } catch (error) {
    throw error;
  }
};
const deleteOne = async (model, filter) => {
  try {
    await model.deleteOne(filter);
  } catch (error) {
    throw error;
  }
};

const insert = async (model, payload) => {
  try {
    await model.create(payload);
  } catch (error) {
    return handleError(error);
  }
};
