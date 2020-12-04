import { response } from 'express';
import mongoose from 'mongoose';
import { ErrorHandler, handleResponse } from '../helpers/response';
import { Account, Customer } from '../models';

export {
  getCustomerList,
  getCustomerDetail,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};

const customers = [
  {
    name: 'vmo holdings',
    description: 'vmo holdings',
    priorityNumber: 4,
    status: 'active',
  },
  {
    name: 'vng',
    description: 'vng',
    priorityNumber: 3,
    status: 'active',
  },
  {
    name: 'fpt',
    description: 'fpt',
    priorityNumber: 5,
    status: 'active',
  },
  {
    name: 'mol logistics',
    description: 'mol logistics',
    priorityNumber: 2,
    status: 'active',
  },
  {
    name: 'dingtea',
    description: 'dingtea',
    priorityNumber: 2,
    status: 'inactive',
  },
  {
    name: 'medlatec',
    description: 'medlatec',
    priorityNumber: 5,
    status: 'active',
  },
  {
    name: 'tocotoco',
    description: 'tocotoco',
    priorityNumber: 4,
    status: 'inactive',
  },
  {
    name: 'viettel',
    description: 'viettel',
    priorityNumber: 2,
    status: 'active',
  },
  {
    name: 'vnpt',
    description: 'vnpt',
    priorityNumber: 1,
    status: 'inactive',
  },
  {
    name: 'neon studio',
    description: 'neon studio',
    priorityNumber: 3,
    status: 'inactive',
  },
  {
    name: 'misa',
    description: 'misa',
    priorityNumber: 2,
    status: 'inactive',
  },
];

const getCustomerList = async (req, res) => {
  try {
    const customerListRecord = await Customer.find({});
    const response = handleResponse(200, '', '', customerListRecord);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const getCustomerDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const customerRecord = await Customer.findOne({ _id: id });
    if (!customerRecord) {
      throw new ErrorHandler(404, 'Account not exists', 'INVALID');
    }
    const response = handleResponse(
      200,
      'Get data successfully',
      'GET_DATA_SUCCESSFULLY',
      customerRecord
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const createCustomer = async (req, res) => {
  try {
    const { name, description, priorityPoint, status } = req.body;
    await Customer.update({ name, description, priorityPoint, status });
    const response = handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY'
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const response = handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const response = handleResponse(
      200,
      'Delete data successfully',
      'DELETE_DATA_SUCCESSFULLY'
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};
