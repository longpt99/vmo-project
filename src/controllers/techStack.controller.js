import { createStaffService } from '../services/staff.service';
import {
  deleteTechStackService,
  getTechStackService,
  getTechStacksService,
  updateTechStackService,
} from '../services/techStack.service';

export {
  getTechStackList,
  getTechStackDetail,
  createTechStack,
  updateTechStack,
  deleteTechStack,
};

const getTechStackList = async (req, res) => {
  try {
    const response = await getTechStacksService();
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getTechStackDetail = async (req, res) => {
  try {
    const response = await getTechStackService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const createTechStack = async (req, res) => {
  try {
    const response = await createStaffService(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateTechStack = async (req, res) => {
  try {
    const response = await updateTechStackService(req.params.id, req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteTechStack = async (req, res) => {
  try {
    const response = await deleteTechStackService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
