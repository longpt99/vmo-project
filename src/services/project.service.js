import { ErrorHandler, handleError } from '../helpers/response';
import {
  Customer,
  Department,
  Project,
  ProjectType,
  StaffExp,
  TechStack,
} from '../models';
import {
  findOne,
  findMany,
  updateOne,
  updateMany,
  deleteOne,
} from './commonQuery.service';
import len from '../services/arrayLength';

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
      staffsId,
      customersId,
      status,
    } = payload;
    const techStacksRecord = await findMany(
      TechStack,
      {
        _id: {
          $in: techStacksId,
        },
        status: 'active',
      },
      'id'
    );
    if (len(techStacksRecord) < len(techStacksId)) {
      throw new ErrorHandler(400, 'Invalid tech stack', 'INVALID');
    }
    const staffsRecord = await findMany(
      Staff,
      {
        _id: {
          $in: staffsId,
        },
      },
      'id'
    );

    if (len(staffsRecord) < len(staffsId)) {
      throw new ErrorHandler(400, 'Invalid staff', 'INVALID');
    }

    const departmentsRecord = await findMany(
      Department,
      {
        _id: {
          $in: departmentsId,
        },
      },
      'id'
    );

    if (len(departmentsRecord) < len(departmentsId)) {
      throw new ErrorHandler(400, 'Invalid department', 'INVALID');
    }

    const projectTypesRecord = await findMany(
      ProjectType,
      {
        _id: {
          $in: projectTypesId,
        },
        status: 'active',
      },
      'id'
    );

    if (len(projectTypesRecord) < len(projectTypesId)) {
      throw new ErrorHandler(400, 'Invalid project Type', 'INVALID');
    }

    const customersRecord = await findMany(
      Customer,
      {
        _id: {
          $in: customersId,
        },
        status: 'active',
      },
      'id'
    );

    if (len(customersRecord) < len(customersId)) {
      throw new ErrorHandler(400, 'Invalid customer', 'INVALID');
    }
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
        status,
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
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    return handleError(error);
  }
};
