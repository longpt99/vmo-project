import {
  createProjectStatusService,
  deleteProjectStatusService,
  getProjectStatusService,
  getProjectStatusesService,
  updateProjectStatusService,
} from '../services/projectStatus.service';

export {
  getProjectStatuses,
  getProjectStatus,
  createProjectStatus,
  updateProjectStatus,
  deleteProjectStatus,
};

const getProjectStatuses = async (req, res) => {
  try {
    const response = await getProjectStatusesService();
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getProjectStatus = async (req, res) => {
  try {
    const response = await getProjectStatusService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createProjectStatus = async (req, res) => {
  try {
    const response = await createProjectStatusService(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateProjectStatus = async (req, res) => {
  try {
    const response = await updateProjectStatusService(req.params.id, req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteProjectStatus = async (req, res) => {
  try {
    const response = await deleteProjectStatusService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
