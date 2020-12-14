import {
  createProjectTypeService,
  deleteProjectTypeService,
  getProjectTypeService,
  getProjectTypesService,
  updateProjectTypeService,
} from '../services/projectType.service';

export {
  getProjectTypes,
  getProjectTypeDetail,
  createProjectType,
  updateProjectType,
  deleteProjectType,
};

const getProjectTypes = async (req, res, next) => {
  try {
    const response = await getProjectTypesService();
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const getProjectTypeDetail = async (req, res, next) => {
  try {
    const response = await getProjectTypeService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const createProjectType = async (req, res, next) => {
  try {
    const response = await createProjectTypeService(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const updateProjectType = async (req, res, next) => {
  try {
    const response = await updateProjectTypeService(req.params.id, req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const deleteProjectType = async (req, res, next) => {
  try {
    const response = await deleteProjectTypeService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

// const Types = [
//   {
//     name: 'banking and finance',
//     description: 'banking and finance',
//     priorityPoint: 5,
//     status: 'active',
//   },
//   {
//     name: 'education',
//     description: 'education',
//     priorityPoint: 3,
//     status: 'active',
//   },
//   {
//     name: 'medical',
//     description: 'medical',
//     priorityPoint: 4,
//     status: 'active',
//   },
//   {
//     name: 'ecommerce',
//     description: 'ecommerce',
//     priorityPoint: 5,
//     status: 'active',
//   },
//   {
//     name: 'media',
//     description: 'media',
//     priorityPoint: 3,
//     status: 'inactive',
//   },
//   {
//     name: 'machine learning',
//     description: 'machine learning',
//     priorityPoint: 5,
//     status: 'inactive',
//   },
//   {
//     name: 'construction',
//     description: 'construction',
//     priorityPoint: 2,
//     status: 'inactive',
//   },
// ];
