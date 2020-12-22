import { ErrorHandler, handleResponse } from '../helpers/response.helper';
import { Customer, Project } from '../models';
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
    throw error;
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
    throw error;
  }
};

const createCustomerService = async (payload) => {
  try {
    const { name } = payload;
    const record = await findOne(Customer, { name }, 'id');
    if (record) {
      throw new ErrorHandler(404, `Customer ${name} already exists`, 'INVALID');
    }
    await insert(Customer, payload);
    return handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};

const updateCustomerService = async (id, payload) => {
  try {
    const record = await findOne(Customer, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Customer not exists', 'INVALID');
    }
    const { name } = payload;
    const customerRecord = await findOne(Customer, { name }, 'id');
    if (customerRecord && customerRecord.id !== id) {
      throw new ErrorHandler(404, `Customer ${name} already exists`, 'INVALID');
    }
    await updateOne(Customer, { _id: id }, { $set: payload });
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};

const deleteCustomerService = async (id) => {
  try {
    const record = await findOne(Customer, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Customer not exists', 'INVALID');
    }
    await Promise.all([
      deleteOne(Customer, { _id: id }),
      updateMany(Project, { customersId: id }, { $pull: { customersId: id } }),
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
