import { response } from 'express';
import mongoose from 'mongoose';
import { ErrorHandler, handleResponse } from '../helpers/response';
import { Account, Customer } from '../models';

export { getCustomerList, getCustomerDetail, createCustomer };

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
      throw new ErrorHandler(404, '', '');
    }
    const response = handleResponse(200, '', '', customerRecord);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const createCustomer = async (req, res) => {
  try {
    const { name, description, priorityPoint, status } = req.body;

    const customerRecord = await Customer.findOne({ name });

    if (customerRecord) {
      throw new ErrorHandler(400, '', 'ERROR_CUSTOMER');
    }
    console.log(description);
    await Customer.create({ name, description, priorityPoint, status });
    const response = handleResponse(200, '', '');
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const response = handleResponse(200, '', '');
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const response = handleResponse(200, '', '');
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};
