export {
  findOne,
  findMany,
  insert,
  updateOne,
  deleteOne,
  updateMany,
  deleteMany,
  findLength,
};

const findOne = async (model, filter, projection = '', populate) => {
  try {
    return await model.findOne(filter, projection);
    // .populate(populate);
  } catch (error) {
    throw error;
  }
};

const findMany = async (model, filter, projection = '', populate) => {
  try {
    return await model.find(filter, projection).populate(populate);
  } catch (error) {
    throw error;
  }
};

const findLength = async (model, filter, projection = '') => {
  try {
    return await model.find(filter, projection).countDocuments();
  } catch (error) {
    throw error;
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
    return await model.updateMany(filter, doc);
  } catch (error) {
    throw error;
  }
};
const deleteOne = async (model, filter) => {
  try {
    return await model.deleteOne(filter);
  } catch (error) {
    throw error;
  }
};

const insert = async (model, payload) => {
  try {
    return await model.create(payload);
  } catch (error) {
    throw error;
  }
};

const deleteMany = async (model, payload) => {
  try {
    return await model.deleteMany(payload);
  } catch (error) {
    throw error;
  }
};
