import mongoose from 'mongoose';
import { ErrorHandler, handleResponse } from '../helpers/response';
import {
  Customer,
  Department,
  Project,
  ProjectCategory,
  Staff,
  StaffExp,
  TechStack,
} from '../models';
import len from '../services/arrayLength';
export {
  getProjectList,
  getProjectDetail,
  createProject,
  updateProject,
  deleteProject,
};

const getProjectList = async (req, res) => {
  try {
    const record = await Project.find({});
    const response = handleResponse(
      200,
      'Get data successfully',
      'GET_DATA_SUCCESSFULLY',
      { record }
    );
    return res.status(response.status).json(response);
  } catch (error) {
    res.status(error.status).json(error);
  }
};

const getProjectDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Project.findOne({ _id: id });
    if (!record) {
      throw new ErrorHandler(404, 'Invalid', 'INVALID');
    }
    const response = handleResponse(
      200,
      'Get data successfully',
      'GET_DATA_SUCCESSFULLY',
      { record }
    );
    return res.status(response.status).json(response);
  } catch (error) {
    res.status(error.status).json(error);
  }
};

const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      techStacksId,
      projectCategoriesId,
      departmentsId,
      staffsId,
      customersId,
      status,
    } = req.body;

    const techStacksRecord = await TechStack.find(
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

    const staffsRecord = await Staff.find(
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

    const departmentsRecord = await Department.find(
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

    const projectCategoriesRecord = await ProjectCategory.find(
      {
        _id: {
          $in: projectCategoriesId,
        },
        status: 'active',
      },
      'id'
    );

    if (len(projectCategoriesRecord) < len(projectCategoriesId)) {
      throw new ErrorHandler(400, 'Invalid project category', 'INVALID');
    }

    const customersRecord = await Customer.find(
      {
        _id: {
          $in: customersId,
        },
        status: 'active',
      },
      'id'
    );

    if (len(customersRecord) < len(customersId)) {
      throw new ErrorHandler(400, 'Invalid custormer', 'INVALID');
    }

    const projectId = mongoose.Types.ObjectId();
    console.log(projectId);
    await Promise.all([
      Project.create({
        _id: projectId,
        name,
        description,
        techStacksId,
        projectCategoriesId,
        departmentsId,
        staffsId,
        customersId,
        status,
      }),
      StaffExp.updateMany(
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
      Department.updateMany(
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
    const response = handleResponse(200, '', '');
    return res.status(response.status).json(response);
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return res.status(error.status).json(error);
    }
    return res.json(error);
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projectRecord = await Project.findOne({ _id: id }, 'id');
    if (!projectRecord) {
      throw new ErrorHandler(404, '', '');
    }
    await Project.updateOne({ _id: id }, { ...req.body });
    const response = handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
    return res.status(response.status).json(response);
  } catch (error) {
    res.status(error.status).json(error);
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    // const projectRecord = await Project.findOne({ _id: id });
    // if (!projectRecord) {
    //   throw new ErrorHandler(404, '', '');
    // }
    // await Project.deleteOne({ _id: id });
    await Promise.all([
      Project.deleteOne({ _id: id }),
      StaffExp.updateMany(
        {
          projectsId: { $in: id },
        },
        {
          $pull: {
            projectsId: id,
          },
        }
      ),
      Department.updateMany(
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
    const response = handleResponse(
      200,
      'Delete data successfully',
      'DELETE_DATA_SUCCESSFULLY'
    );
    return res.status(response.status).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(error.status).json(error);
  }
};
