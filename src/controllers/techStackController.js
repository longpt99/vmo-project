import { handleResponse } from '../helpers/response';
import { TechStack } from '../models';

export {
  getTechStackList,
  getTechStackDetail,
  createTechStack,
  updateTechStack,
  deleteTechStack,
};

const getTechStackList = async (req, res) => {
  try {
    const records = await TechStack.find({});
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
const getTechStackDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const techRecord = await TechStack.findOne({ _id: id });

    if (!techRecord) {
      throw new ErrorHandler(404, 'Tech stack not exists', 'INVALID');
    }
    const response = handleResponse(
      200,
      'Get data successfully',
      'GET_DATA_SUCCESSFULLY',
      { record: techRecord }
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};
const createTechStack = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const TechStackRecord = await TechStack.create({
      name,
      description,
      status,
    });
    const response = handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY',
      TechStackRecord
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};
const updateTechStack = async (req, res) => {
  try {
    const { id } = req.params;
    const techRecord = await TechStack.findOne({ _id: id }, 'id');
    if (!techRecord) {
      throw new ErrorHandler(404, 'Tech not exists', 'INVALID');
    }
    await TechStack.updateOne(
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
const deleteTechStack = async (req, res) => {
  try {
    const { id } = req.params;
    await TechStack.findByIdAndDelete(id);
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

// const stack = [
//   {
//     name: 'nodejs',
//     description: 'nodejs',
//     status: 'active',
//   },
//   {
//     name: 'reactjs',
//     description: 'reactjs',
//     status: 'active',
//   },
//   {
//     name: 'expressjs',
//     description: 'expressjs',
//     status: 'active',
//   },
//   {
//     name: 'sailsjs',
//     description: 'sailsjs',
//     status: 'active',
//   },
//   {
//     name: 'hapijs',
//     description: 'hapijs',
//     status: 'active',
//   },
//   {
//     name: 'angular',
//     description: 'angular',
//     status: 'inactive',
//   },
//   {
//     name: 'java',
//     description: 'java',
//     status: 'inactive',
//   },
//   {
//     name: 'javascript',
//     description: 'javascript',
//     status: 'active',
//   },
//   {
//     name: 'php',
//     description: 'php',
//     status: 'inactive',
//   },
//   {
//     name: 'mongodb',
//     description: 'mongodb',
//     status: 'active',
//   },
//   {
//     name: 'chai',
//     description: 'chai',
//     status: 'active',
//   },
//   {
//     name: 'mocha',
//     description: 'mocha',
//     status: 'active',
//   },
//   {
//     name: 'sinon',
//     description: 'sinon',
//     status: 'active',
//   },
//   {
//     name: 'vuejs',
//     description: 'vuejs',
//     status: 'active',
//   },
//   {
//     name: 'nestjs',
//     description: 'nestjs',
//     status: 'active',
//   },
//   {
//     name: 'nextjs',
//     description: 'nextjs',
//     status: 'active',
//   },
//   {
//     name: 'jest',
//     description: 'jest',
//     status: 'active',
//   },
//   {
//     name: 'spring',
//     description: 'spring',
//     status: 'active',
//   },
//   {
//     name: 'rails',
//     description: 'rails',
//     status: 'active',
//   },
//   {
//     name: 'deno',
//     description: 'deno',
//     status: 'inactive',
//   },
//   {
//     name: 'jquery',
//     description: 'jquery',
//     status: 'inactive',
//   },
//   {
//     name: 'mysql',
//     description: 'mysql',
//     status: 'active',
//   },
//   {
//     name: 'sqlserver',
//     description: 'sqlserver',
//     status: 'active',
//   },
//   {
//     name: 'docker',
//     description: 'docker',
//     status: 'active',
//   },
// ];
