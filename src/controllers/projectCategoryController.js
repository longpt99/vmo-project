import mongoose from 'mongoose';
import { ErrorHandler, handleResponse } from '../helpers/response';
import { ProjectCategory } from '../models';
import len from '../services/arrayLength';

export {
  getProjectCategories,
  getProjectCategoryDetail,
  createProjectCategory,
  updateProjectCategory,
  deleteProjectCategory,
};

const categories = [
  {
    name: 'banking and finance',
    description: 'banking and finance',
    priorityPoint: 5,
    status: 'active',
  },
  {
    name: 'education',
    description: 'education',
    priorityPoint: 3,
    status: 'active',
  },
  {
    name: 'medical',
    description: 'medical',
    priorityPoint: 4,
    status: 'active',
  },
  {
    name: 'ecommerce',
    description: 'ecommerce',
    priorityPoint: 5,
    status: 'active',
  },
  {
    name: 'media',
    description: 'media',
    priorityPoint: 3,
    status: 'inactive',
  },
  {
    name: 'machine learning',
    description: 'machine learning',
    priorityPoint: 5,
    status: 'inactive',
  },
  {
    name: 'construction',
    description: 'construction',
    priorityPoint: 2,
    status: 'inactive',
  },
];

const getProjectCategories = async (req, res) => {
  try {
    const records = await ProjectCategory.find({});
    const response = handleResponse(
      200,
      'Get data successfully',
      'GET_DATA_SUCCESSFULLY',
      { records }
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const getProjectCategoryDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await ProjectCategory.findOne({ _id: id });
    const response = handleResponse(
      200,
      'Get data successfully',
      'GET_DATA_SUCCESSFULLY',
      { record }
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const createProjectCategory = async (req, res) => {
  try {
    const { name, description, priorityPoint, status } = req.body;
    await ProjectCategory.create({ name, description, priorityPoint, status });
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

const updateProjectCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await ProjectCategory.findOne({ _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Project category not exists', 'INVALID');
    }
    await ProjectCategory.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...req.body,
        },
      }
    );
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

const deleteProjectCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await ProjectCategory.findOne({ _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Project category not exists', 'INVALID');
    }
    await ProjectCategory.deleteOne({ _id: id });
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
