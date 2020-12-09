import { ErrorHandler, handleError, handleResponse } from '../helpers/response';
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
  insertOne,
} from './commonQuery.service';
import len from '../services/arrayLength';
import mongoose from 'mongoose';

export {
  getProjectsService,
  getProjectService,
  createProjectService,
  updateProjectService,
  deleteProjectService,
};

const getProjectsService = async () => {
  try {
    const record = await findMany(Project, {});
    return handleResponse(
      200,
      'Get data successfully',
      'GET_DATA_SUCCESSFULLY',
      record
    );
  } catch (error) {
    return handleError(error);
  }
};

const getProjectService = async (id) => {
  try {
    const record = await findOne(Project, { _id: id });
    return handleResponse(
      200,
      'Get data successfully',
      'GET_DATA_SUCCESSFULLY',
      record
    );
  } catch (error) {
    return handleError(error);
  }
};

const createProjectService = async (payload) => {
  try {
    const {
      name,
      description,
      techStacksId,
      projectTypesId,
      departmentsId,
      projectStatusId,
      staffsId,
      customersId,
    } = payload;
    const techStacksAsync = findMany(
      TechStack,
      {
        _id: {
          $in: techStacksId,
        },
        status: 'active',
      },
      'id'
    );

    const staffsAsync = findMany(
      Staff,
      {
        _id: {
          $in: staffsId,
        },
      },
      'id'
    );

    const departmentsAsync = findMany(
      Department,
      {
        _id: {
          $in: departmentsId,
        },
      },
      'id'
    );

    const projectTypesAsync = findMany(
      ProjectType,
      {
        _id: {
          $in: projectTypesId,
        },
        status: 'active',
      },
      'id'
    );

    const customersAsync = findMany(
      Customer,
      {
        _id: {
          $in: customersId,
        },
        status: 'active',
      },
      'id'
    );

    const techStacksRecord = await techStacksAsync;
    if (len(techStacksRecord) < len(techStacksId)) {
      throw new ErrorHandler(400, 'Invalid tech stack', 'INVALID');
    }

    const staffsRecord = await staffsAsync;
    if (len(staffsRecord) < len(staffsId)) {
      throw new ErrorHandler(400, 'Invalid staff', 'INVALID');
    }

    const departmentsRecord = await departmentsAsync;
    if (len(departmentsRecord) < len(departmentsId)) {
      throw new ErrorHandler(400, 'Invalid department', 'INVALID');
    }

    const projectTypesRecord = await projectTypesAsync;
    if (len(projectTypesRecord) < len(projectTypesId)) {
      throw new ErrorHandler(400, 'Invalid project Type', 'INVALID');
    }

    const customersRecord = await customersAsync;
    if (len(customersRecord) < len(customersId)) {
      throw new ErrorHandler(400, 'Invalid customer', 'INVALID');
    }

    await findOne(ProjectStatus, {
      _id: projectStatusId,
      status: 'active',
    });
    const projectId = mongoose.Types.ObjectId();
    await Promise.all([
      insertOne(Project, {
        _id: projectId,
        name,
        description,
        techStacksId,
        projectTypesId,
        departmentsId,
        staffsId,
        customersId,
        projectStatusId,
      }),
      updateMany(
        StaffExp,
        {
          staffId: {
            $in: staffsId,
          },
        },
        {
          $push: {
            projectsId: projectId,
          },
        }
      ),
      updateMany(
        Department,
        {
          _id: {
            $in: departmentsId,
          },
        },
        {
          $push: {
            projectsId: projectId,
          },
        }
      ),
    ]);
    return handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    return handleError(error);
  }
};

const updateProjectService = async (id, payload) => {
  try {
    if (!id) {
      throw new ErrorHandler(400, 'Invalid', 'INVALID');
    }
    await findOne(Project, { _id: id });
    await updateOne(
      Project,
      {
        _id: id,
      },
      {
        $set: {
          ...payload,
        },
      }
    );
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteProjectService = async (id) => {
  try {
    if (!id) {
      throw new ErrorHandler(400, 'Invalid', 'INVALID');
    }
    await findOne(Project, { _id: id });
    await deleteOne(Project, { _id: id });
    await Promise.all([
      deleteOne(Project, { _id: id }),
      updateMany(
        StaffExp,
        {
          projectsId: { $in: id },
        },
        {
          $pull: {
            projectsId: id,
          },
        }
      ),
      updateMany(
        Department,
        {
          projectsId: { $in: id },
        },
        {
          $pull: {
            projectsId: id,
          },
        }
      ),
    ]);
    return handleResponse(
      200,
      'Delete data successfully',
      'DELETE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    return handleError(error);
  }
};
