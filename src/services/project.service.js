import { ErrorHandler, handleResponse } from '../helpers/response.helper';
import {
  Customer,
  Department,
  Project,
  ProjectStatus,
  ProjectType,
  Staff,
  StaffExp,
  TechStack,
} from '../models';
import {
  findOne,
  findMany,
  updateOne,
  updateMany,
  deleteOne,
  insert,
  findLength,
  findManyWithPag,
} from './commonQuery.service';
import len from '../utils/arrayLength.util';
import { Types } from 'mongoose';
import paginationUtil from '../utils/pagination.util';

export {
  getProjectsService,
  getProjectService,
  createProjectService,
  updateProjectService,
  deleteProjectService,
};

const getProjectsService = async (queryString) => {
  try {
    const { page, limit } = queryString;
    const totalDoc = await findLength(Project, {});
    const totalPage = Math.ceil(totalDoc / limit);
    if (page > totalPage) {
      throw new ErrorHandler(404, 'Page not found', 'INVALID');
    }
    const { startIndex, perPage } = paginationUtil(page, limit);

    const record = await findManyWithPag(
      Project,
      {},
      'name description createdAt',
      startIndex,
      perPage
    );
    return handleResponse(200, 'Get data successfully', 'SUCCEED', {
      record,
      totalDoc,
      startIndex,
    });
  } catch (error) {
    throw error;
  }
};

const getProjectService = async (id) => {
  try {
    const populate = [
      { path: 'techStacksId', select: 'name status' },
      { path: 'departmentsId', select: 'name' },
      { path: 'staffsId', select: 'name' },
      { path: 'customersId', select: 'name' },
      { path: 'projectTypesId', select: 'name' },
      { path: 'projectStatusId', select: 'name' },
    ];
    const record = await findOne(Project, { _id: id }, '', populate);
    if (!record) {
      throw new ErrorHandler(404, 'Project not exists', 'INVALID');
    }
    return handleResponse(200, 'Get data successfully', 'SUCCEED', record);
  } catch (error) {
    throw error;
  }
};

const createProjectService = async (payload) => {
  try {
    const { staffsId, departmentsId } = payload;
    await verifyProjectRequest(payload);
    const projectId = Types.ObjectId();
    await Promise.all([
      insert(Project, {
        _id: projectId,
        ...payload,
      }),
      updateMany(
        StaffExp,
        { staffId: { $in: staffsId } },
        { $push: { projectsId: projectId } }
      ),
      updateMany(
        Department,
        { _id: { $in: departmentsId } },
        { $push: { projectsId: projectId } }
      ),
    ]);
    return handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};

const updateProjectService = async (id, payload) => {
  try {
    const { update, remove } = payload;
    const record = await findOne(Project, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Project not exists', 'INVALID');
    }
    if (update) {
      await verifyProjectRequest(update, id);
      await updateOne(Project, { _id: id }, { $set: update });
      await updateMany(
        StaffExp,
        { staffId: { $in: update.staffsId }, projectsId: { $ne: id } },
        { $push: { projectsId: id } }
      );
      await updateMany(
        Department,
        { _id: { $in: update.departmentsId }, projectsId: { $ne: id } },
        { $push: { projectsId: id } }
      );
    }

    if (remove) {
      await Promise.all([
        updateMany(
          Department,
          { _id: { $in: remove.departmentsId } },
          { $pull: { projectsId: id } }
        ),
        updateMany(
          StaffExp,
          { staffId: { $in: remove.staffsId } },
          { $pull: { projectsId: id } }
        ),
      ]);
    }
    return handleResponse(200, 'Update data successfully', 'SUCCEED');
  } catch (error) {
    throw error;
  }
};

const deleteProjectService = async (id) => {
  try {
    if (!id) {
      throw new ErrorHandler(400, 'Invalid', 'INVALID');
    }
    const record = await findOne(Project, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Project not exist');
    }
    await Promise.all([
      deleteOne(Project, { _id: id }),
      updateMany(StaffExp, { projectsId: id }, { $pull: { projectsId: id } }),
      updateMany(Department, { projectsId: id }, { $pull: { projectsId: id } }),
    ]);
    return handleResponse(200, 'Delete data successfully', 'SUCCEED');
  } catch (error) {
    throw error;
  }
};

const verifyProjectRequest = async (payload, id) => {
  const {
    name,
    techStacksId = [],
    projectTypesId = [],
    departmentsId = [],
    projectStatusId,
    staffsId = [],
    customersId = [],
  } = payload;

  const projectRecord = await findOne(Project, { name }, 'id');
  if (projectRecord && projectRecord.id !== id) {
    throw new ErrorHandler(404, 'Project already exists', 'INVALID');
  }

  const techStacksAsync = findLength(
    TechStack,
    { _id: { $in: techStacksId }, status: 'active' },
    'id'
  );

  const staffsAsync = findLength(Staff, { _id: { $in: staffsId } }, 'id');

  const departmentsAsync = findLength(
    Department,
    { _id: { $in: departmentsId } },
    'id'
  );

  const projectTypesAsync = findLength(
    ProjectType,
    { _id: { $in: projectTypesId }, status: 'active' },
    'id'
  );

  const customersAsync = findLength(
    Customer,
    { _id: { $in: customersId }, status: 'active' },
    'id'
  );

  const lenTechStacksRecord = await techStacksAsync;
  if (lenTechStacksRecord < len(techStacksId)) {
    throw new ErrorHandler(400, 'Invalid tech stack', 'INVALID');
  }

  const lenStaffsRecord = await staffsAsync;
  if (lenStaffsRecord < len(staffsId)) {
    throw new ErrorHandler(400, 'Invalid staff', 'INVALID');
  }

  const lenDepartmentsRecord = await departmentsAsync;
  if (lenDepartmentsRecord < len(departmentsId)) {
    throw new ErrorHandler(400, 'Invalid department', 'INVALID');
  }

  const lenProjectTypesRecord = await projectTypesAsync;
  if (lenProjectTypesRecord < len(projectTypesId)) {
    throw new ErrorHandler(400, 'Invalid project Type', 'INVALID');
  }

  const lenCustomersRecord = await customersAsync;
  if (lenCustomersRecord < len(customersId)) {
    throw new ErrorHandler(400, 'Invalid customer', 'INVALID');
  }

  // const projectStatusRecord = await projectStatusAsync;
  // if (projectStatusRecord < Object.keys(projectStatusId).length) {
  //   throw new ErrorHandler(400, 'Invalid project status', 'INVALID');
  // }

  if (projectStatusId) {
    const lenProjectStatusRecord = await findOne(
      ProjectStatus,
      { _id: projectStatusId, status: 'active' },
      'id'
    );
    if (!lenProjectStatusRecord) {
      throw new ErrorHandler(400, 'Invalid project status', 'INVALID');
    }
  }
};
