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

const getProjectList = async (req, res, next) => {
  try {
    const response = await getProjectsService(req.query);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const getProjectDetail = async (req, res, next) => {
  try {
    const response = await getProjectService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const response = await createProjectService(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const response = await updateProjectService(req.params.id, req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const response = await deleteProjectService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};
