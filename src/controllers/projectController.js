import mongoose from 'mongoose';
import { ErrorHandler, handleResponse } from '../helpers/response';
import {
  Customer,
  Office,
  Project,
  ProjectCategory,
  Staff,
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
    const projects = await Project.find({});
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
      description,
      techsId,
      projectCategoriesId,
      officesId,
      staffsId,
      customersId,
      status,
    } = req.body;

    const techsRecord = await Tech.find({
      _id: {
        $in: techsId,
      },
      status: 'active',
    });

    if (len(techsRecord) < len(techsId)) {
      throw new ErrorHandler(404, '', '');
    }

    const staffsRecord = await Staff.find({
      _id: {
        $in: staffsId,
      },
    }).select({ _id: 1 });

    if (len(staffsRecord) < len(staffsId)) {
      throw new ErrorHandler(400, '', '');
    }

    const officesRecord = await Office.find({
      _id: {
        $in: officesId,
      },
    }).select({ _id: 1 });

    if (len(officesRecord) < len(officesId)) {
    }

    const projectCategoriesRecord = await ProjectCategory.find({
      _id: {
        $in: projectCategoriesId,
      },
      status: 'active',
    }).select({ _id: 1 });

    if (len(projectCategoriesRecord) < len(officesId)) {
      throw new ErrorHandler(400, '', '');
    }

    // const customerRecord = await Customer.findById(customerId).select({
    //   _id: 1,
    // });

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

    // const projectRecord = await Project.create({
    //   description,
    //   projectCategoryId,
    //   techsId,
    //   officeId,
    //   staffIds,
    // });
    const response = handleResponse(200, '', '', techsRecord);
    return res.status(response.status).json(response);
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return res.status(error.status).json(error);
    }
    return res.json({ error: error.message });
    // console.log(error.message);
    // res.json({ error: error.message });
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
