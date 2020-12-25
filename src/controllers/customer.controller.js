import {
  createCustomerService,
  deleteCustomerService,
  getCustomerService,
  getCustomersService,
  updateCustomerService,
} from '../services/customer.service';

export {
  getCustomerList,
  getCustomerDetail,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};

const getCustomerList = async (req, res, next) => {
  try {
    const response = await getCustomersService(req.query);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const getCustomerDetail = async (req, res, next) => {
  try {
    const response = await getCustomerService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const createCustomer = async (req, res, next) => {
  try {
    const response = await createCustomerService(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const response = await updateCustomerService(req.params.id, req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const response = await deleteCustomerService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

// const customers = [
// {
//   name: 'vmo holdings',
//   description: 'vmo holdings',
//   priorityNumber: 4,
//   status: 'active',
// },
// {
//   name: 'vng',
//   description: 'vng',
//   priorityNumber: 3,
//   status: 'active',
// },
// {
//   name: 'fpt',
//   description: 'fpt',
//   priorityNumber: 5,
//   status: 'active',
// },
// {
//   name: 'mol logistics',
//   description: 'mol logistics',
//   priorityNumber: 2,
//   status: 'active',
// },
// {
//   name: 'dingtea',
//   description: 'dingtea',
//   priorityNumber: 2,
//   status: 'inactive',
// },
// {
//   name: 'medlatec',
//   description: 'medlatec',
//   priorityNumber: 5,
//   status: 'active',
// },
// {
//   name: 'tocotoco',
//   description: 'tocotoco',
//   priorityNumber: 4,
//   status: 'inactive',
// },
// {
//   name: 'viettel',
//   description: 'viettel',
//   priorityNumber: 2,
//   status: 'active',
// },
// {
//   name: 'vnpt',
//   description: 'vnpt',
//   priorityNumber: 1,
//   status: 'inactive',
// },
// {
//   name: 'neon studio',
//   description: 'neon studio',
//   priorityNumber: 3,
//   status: 'inactive',
// },
// {
//   name: 'misa',
//   description: 'misa',
//   priorityNumber: 2,
//   status: 'inactive',
// },
// ];
