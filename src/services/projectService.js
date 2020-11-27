import { Project, ProjectCategory, ProjectStatus } from '../models';

export { projectList };

const projectList = async () => {
  const projects = await Project.find({});
  return projects;
};

const createProject = async () => {
  await Project.create();
};

const createProjectStatus = async () => {
  await ProjectStatus.create();
};

const createProjectCategory = async () => {
  await ProjectCategory.create();
};
const updateProject = async () => {
  await Project.create();
};

const updateProjectStatus = async () => {
  await ProjectStatus.create();
};

const updateProjectCategory = async () => {
  await ProjectCategory.create();
};

const getProjectDetail = async () => {
  await Project.create();
};

const getProjectStatusDetail = async () => {
  await ProjectStatus.create();
};

const getProjectCategoryDetail = async () => {
  await ProjectCategory.create();
};

const deleteProject = async () => {
  await Project.create();
};

const deleteProjectStatus = async () => {
  await ProjectStatus.create();
};

const deleteProjectCategory = async () => {
  await ProjectCategory.create();
};
