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
//     name: 'open',
//     description: 'open',
//     status: 'active',
//   },

//   {
//     name: 'urgent',
//     description: 'urgent',
//     status: 'active',
//   },

//   {
//     name: 'in progress',
//     description: 'in progress',
//     status: 'active',
//   },

//   {
//     name: 'in review',
//     description: 'in review',
//     status: 'active',
//   },

//   {
//     name: 'resolved',
//     description: 'recolved',
//     status: 'active',
//   },

//   {
//     name: 'closed',
//     description: 'closed',
//     status: 'active',
//   },
// ];
