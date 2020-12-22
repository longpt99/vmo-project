import { Staff, StaffExp, TechStack } from '../models';
import {
  createStaffService,
  deleteStaffService,
  getStaffService,
  getStaffsService,
  updateStaffExpService,
  updateStaffService,
  updateStaffRoleService,
} from '../services/staff.service';
export {
  getStaffList,
  getStaffDetail,
  createStaff,
  updateStaff,
  deleteStaff,
  updateStaffExp,
  updateStaffRole,
  getStaffSearch,
};

const getStaffList = async (req, res, next) => {
  try {
    const response = await getStaffsService();
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const getStaffDetail = async (req, res, next) => {
  try {
    debugger;
    const response = await getStaffService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const createStaff = async (req, res, next) => {
  try {
    const response = await createStaffService(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const updateStaff = async (req, res, next) => {
  try {
    const response = await updateStaffService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const deleteStaff = async (req, res, next) => {
  try {
    const response = await deleteStaffService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const updateStaffExp = async (req, res, next) => {
  try {
    const response = await updateStaffExpService(req.params.id, req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const updateStaffRole = async (req, res, next) => {
  try {
    const response = await updateStaffRoleService(req.params.id, req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const getStaffSearch = async (req, res) => {
  try {
    const { techStack, level } = req.query;
    const techStackRecord = await TechStack.findOne({ name: techStack }, 'id');
    const staffExpRecord = await StaffExp.aggregate([
      {
        $match: {
          'skills.techStackId': techStackRecord._id,
          'skills.level': level ? level : { $nin: [1] },
        },
      },
      { $unwind: '$skills' },
      {
        $match: {
          'skills.techStackId': techStackRecord._id,
          'skills.level': level ? level : { $nin: [1] },
        },
      },
      {
        $group: {
          _id: null,
          staffsId: { $push: '$staffId' },
        },
      },
      {
        $project: {
          _id: 0,
          staffsId: 1,
        },
      },
    ]);

    const staffRecord = await Staff.find(
      {
        _id: {
          $in:
            staffExpRecord[0] && staffExpRecord[0].staffsId.length > 0
              ? staffExpRecord[0].staffsId
              : [],
        },
      },
      'name'
    );
    res.json(staffRecord);
  } catch (error) {
    res.json(error.message);
  }
};
