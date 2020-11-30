import mongoose from 'mongoose';
import { ErrorHandler, handleResponse } from '../helpers/response';
import {
  Customer,
  Office,
  Project,
  ProjectCategory,
  Staff,
  StaffExp,
  Tech,
} from '../models';
import len from '../services/arrayLength';
export {
  getProjectList,
  getProjectDetail,
  createProject,
  updateProject,
  deleteProject,
  getProjectCategories,
  getProjectCategoryDetail,
  createProjectCategory,
  updateProjectCategory,
  deleteProjectCategory,
};

const getProjectList = async (req, res) => {
  try {
    const projects = await Project.find({}).lean();
    const response = handleResponse(200, '', '', { projects });
    return res.status(response.status).json(response);
  } catch (error) {
    res.status(error.status).json(error);
  }
};

const getProjectDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const projectRecord = await Project.findById(id);

    if (!projectRecord) {
      throw new ErrorHandler(404, '', '');
    }
    const response = handleResponse(200, '', '', { project: projectRecord });
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
      techsId,
      projectCategoriesId,
      officesId,
      staffsId,
      customerId,
      status,
    } = req.body;

    const techsRecord = await Tech.find({
      _id: {
        $in: techsId,
      },
      status: 'active',
    });

    if (len(techsRecord) < len(techsId)) {
      throw new ErrorHandler(404, '', 'ERROR_TECH');
    }

    const staffsRecord = await Staff.find({
      _id: {
        $in: staffsId,
      },
    }).select({ _id: 1 });

    if (len(staffsRecord) < len(staffsId)) {
      throw new ErrorHandler(400, '', 'ERROR_STAFF');
    }

    const officesRecord = await Office.find({
      _id: {
        $in: officesId,
      },
    }).select({ _id: 1 });

    if (len(officesRecord) < len(officesId)) {
      throw new ErrorHandler(400, '', 'ERROR_OFFICE');
    }

    const projectCategoriesRecord = await ProjectCategory.find({
      _id: {
        $in: projectCategoriesId,
      },
      status: 'active',
    }).select({ _id: 1 });

    if (len(projectCategoriesRecord) < len(projectCategoriesId)) {
      throw new ErrorHandler(400, '', 'ERROR_PROJECT_CATEGORY');
    }

    const customerRecord = await Customer.findOne({
      _id: customerId,
      status: 'active',
    }).select({
      _id: 1,
    });

    if (!customerRecord) {
      throw new ErrorHandler(
        404,
        'Customer not found or not active. Please check!',
        'CUSTOMER_NOT_FOUND'
      );
    }

    // const techsRecord = await Tech.aggregate([
    //   { $project: { status: 1 } },
    //   {
    //     $match: {
    //       _id: {
    //         $in: newData,
    //       },
    //     },
    //   },
    // ]);

    // const isActive = techsRecord.findIndex(
    //   (item) => item.status === 'inactive'
    // );

    // console.log(staffsRecord);

    // const officeRecord = Office.findById({ _id: officeId });

    const projectRecord = await Project.create({
      name,
      description,
      techsId,
      projectCategoriesId,
      officesId,
      staffsId,
      customerId,
      status,
    });

    await Office.updateMany(
      {
        _id: {
          $in: officesId,
        },
      },
      {
        $push: {
          projectsId: projectRecord._id,
        },
      }
    );

    await StaffExp.updateMany(
      {
        staffId: {
          $in: staffsId,
        },
      },
      {
        $push: {
          projectsId: projectRecord._id,
        },
      }
    );

    const response = handleResponse(200, '', '');
    return res.status(response.status).json(response);
  } catch (error) {
    if (error instanceof ErrorHandler) {
      res.status(error.status);
    }
    return res.json(error);
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projectRecord = await Project.findById(id);

    if (!projectRecord) {
      throw new ErrorHandler(404, '', '');
    }

    await Project.updateOne({ ...req.body });
    const response = handleResponse(200, '', '');
    return res.status(response.status).json(response);
  } catch (error) {
    res.status(error.status).json(error);
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projectRecord = await Project.findById(id);

    if (!projectRecord) {
      throw new ErrorHandler(404, '', '');
    }
    await Project.deleteOne({ id });
    const response = handleResponse(200, '', '');
    return res.status(response.status).json(response);
  } catch (error) {
    res.status(error.status).json(error);
  }
};

const getProjectCategories = async (req, res) => {
  try {
    const response = handleResponse(200, '', '');
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const getProjectCategoryDetail = async (req, res) => {
  try {
    const response = handleResponse(200, '', '');
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const createProjectCategory = async (req, res) => {
  try {
    const { name, description, priorityPoint, status } = req.body;
    await ProjectCategory.create({ name, description, priorityPoint, status });
    const response = handleResponse(200, '', '');
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const updateProjectCategory = async (req, res) => {
  try {
    const response = handleResponse(200, '', '');
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const deleteProjectCategory = async (req, res) => {
  try {
    const response = handleResponse(200, '', '');
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};
