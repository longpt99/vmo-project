import { ErrorHandler, handleResponse } from '../helpers/response.helper';
import { Customer, Project } from '../models';
import paginationUtil from '../utils/pagination.util';
import {
  deleteOne,
  findMany,
  findOne,
  insert,
  updateOne,
  updateMany,
  findLength,
} from './commonQuery.service';

export {
  getCustomersService,
  getCustomerService,
  createCustomerService,
  updateCustomerService,
  deleteCustomerService,
};

const getCustomersService = async (queryString) => {
  try {
    const { page, limit } = queryString;
    const totalDoc = await findLength(Customer, {});
    const totalPage = Math.ceil(totalDoc / limit);
    if (page > totalPage) {
      throw new ErrorHandler(404, 'Page not found', 'INVALID');
    }
    const { startIndex, perPage } = paginationUtil(page, limit);
    const record = await findMany(
      Customer,
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

const getCustomerService = async (id) => {
  try {
    const record = await findOne(Customer, { _id: id }, '-__v -updatedAt');
    if (!record) {
      throw new ErrorHandler(404, 'Customer not exists', 'INVALID');
    }
    return handleResponse(200, 'Get data successfully', 'SUCCEED', record);
  } catch (error) {
    throw error;
  }
};

const createCustomerService = async (payload) => {
  try {
    const { name } = payload;
    const lenRecord = await findLength(Customer, { name });
    if (lenRecord) {
      throw new ErrorHandler(404, `Customer already exists`, 'INVALID');
    }
    const record = await insert(Customer, payload);
    return handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY',
      { recordId: record._id }
    );
  } catch (error) {
    throw error;
  }
};

const updateCustomerService = async (id, payload) => {
  try {
    const lenRecord = await findLength(Customer, { _id: id });
    if (!lenRecord) {
      throw new ErrorHandler(404, 'Customer not exists', 'INVALID');
    }
    const { name } = payload;
    const customerRecord = await findOne(Customer, { name }, 'id');
    if (customerRecord && customerRecord.id !== id) {
      throw new ErrorHandler(404, `Customer ${name} already exists`, 'INVALID');
    }
    await updateOne(Customer, { _id: id }, { $set: payload });
    return handleResponse(200, 'Update data successfully', 'SUCCEED');
  } catch (error) {
    throw error;
  }
};

const deleteCustomerService = async (id) => {
  try {
    const lenRecord = await findLength(Customer, { _id: id });
    if (!lenRecord) {
      throw new ErrorHandler(404, 'Customer not exists', 'INVALID');
    }
    await Promise.all([
      deleteOne(Customer, { _id: id }),
      updateMany(Project, { customersId: id }, { $pull: { customersId: id } }),
    ]);
    return handleResponse(200, 'Delete data successfully', 'SUCCEED');
  } catch (error) {
    throw error;
  }
};
