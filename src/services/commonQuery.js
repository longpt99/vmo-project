const findOne = (model, filter, projection = '') => {
  const record = model.findOne(filter, projection);
};

const updateOne = () => {};
const updateMany = () => {};
const deleteOne = () => {};

const createNewData = async (model, body) => {
  try {
    await model.create(body);
    return;
  } catch (error) {}
};
