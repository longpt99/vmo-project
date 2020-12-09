import {
  createProjectService,
  deleteProjectService,
  getProjectService,
  getProjectsService,
  updateProjectService,
} from '../services/project.service';
export {
  getProjectList,
  getProjectDetail,
  createProject,
  updateProject,
  deleteProject,
};

const getProjectList = async (req, res) => {
  try {
    const response = await getProjectsService();
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getProjectDetail = async (req, res) => {
  try {
    const response = await getProjectService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const response = await createProjectService(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const response = await updateProjectService(req.params.id, req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const response = await deleteProjectService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
