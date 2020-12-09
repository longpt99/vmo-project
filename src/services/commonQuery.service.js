import { ErrorHandler, handleError } from '../helpers/response';
export { findOne, findMany, insertOne, updateOne, deleteOne, updateMany };

const findOne = async (model, filter, projection = '') => {
  try {
    const record = await model.findOne(filter, projection);
    if (!record) {
      throw new ErrorHandler(404, `${model.modelName} not exists`, 'INVALID');
    }
    return record;
  } catch (error) {
    throw error;
  }
};

const findMany = async (model, filter, projection = '') => {
  try {
    const record = await model.find(filter, projection);
    if (!record) {
      throw new ErrorHandler(404, 'User not exists', 'INVALID');
    }
    return record;
  } catch (error) {
    return error;
  }
};

const updateOne = async (model, filter, doc) => {
  try {
    await model.updateOne(filter, doc);
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

const createNewData = async (model, body) => {
  try {
    await model.create(body);
    return;
  } catch (error) {}
};

const insertOne = async (model, payload) => {
  try {
    await model.create(payload);
  } catch (error) {
    return handleError(error);
  }
};
