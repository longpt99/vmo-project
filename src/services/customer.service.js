import { ErrorHandler, handleError, handleResponse } from '../helpers/response';
import { Customer } from '../models';
import {
  deleteOne,
  findMany,
  findOne,
  insert,
  updateOne,
  updateMany,
} from './commonQuery.service';

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
    if (!record) {
      throw new ErrorHandler(404, 'Customer not exists', 'INVALID');
    }
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
    const { name } = payload;
    const record = await findOne(Customer, { name }, 'id');
    if (record) {
      throw new ErrorHandler(404, 'Customer already exists', 'INVALID');
    }
    await insert(Customer, payload);
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
    const record = await findOne(Customer, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Customer not exists', 'INVALID');
    }
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
    const record = await findOne(Customer, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Customer not exists', 'INVALID');
    }
    await deleteOne(Customer, { _id: id });
    return handleResponse(
      200,
      'Delete data successfully',
      'DELETE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    return handleError(error);
  }
};
