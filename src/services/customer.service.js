import { handleError, handleResponse } from '../helpers/response';
import { Customer } from '../models';
import { deleteOne, findMany, findOne, updateOne } from './commonQuery.service';

export {
  getCustomersService,
  getCustomerService,
  createCustomerService,
  updateCustomerService,
  deleteCustomerService,
};

const getCustomersService = async () => {
  try {
    const record = await findMany(Customer, {});
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

const getCustomerService = async (id) => {
  try {
    const record = await findOne(Customer, { _id: id });
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

const createCustomerService = async (payload) => {
  try {
    await insertOne(Customer, payload);
    return handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    return handleError(error);
  }
};

const updateCustomerService = async (id, payload) => {
  try {
    await findOne(Customer, { _id: id });
    await updateOne(Customer, { _id: id }, { $set: payload });
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteCustomerService = async (id) => {
  try {
    await findOne(Customer, { _id: id });
    await deleteOne(Customer, { _id: id });
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    return handleError(error);
  }
};
