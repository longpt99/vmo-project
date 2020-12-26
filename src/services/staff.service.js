import { ErrorHandler, handleResponse } from '../helpers/response.helper';
import {
  Account,
  Department,
  Permission,
  Project,
  Role,
  Staff,
  StaffExp,
  TechStack,
} from '../models';
import {
  findOne,
  findMany,
  updateOne,
  deleteOne,
  insert,
  updateMany,
  findLength,
} from './commonQuery.service';
import { Types } from 'mongoose';
import len from '../utils/arrayLength.util';
import paginationUtil from '../utils/pagination.util';
import sizeof from 'object-sizeof';

export {
  getStaffsService,
  getStaffService,
  createStaffService,
  updateStaffService,
  deleteStaffService,
  updateStaffExpService,
  updateStaffRoleService,
};

const getStaffsService = async (queryString) => {
  try {
    const { page, limit } = queryString;
    const totalDoc = await findLength(Staff, {});
    const totalPage = Math.ceil(totalDoc / limit);
    if (page > totalPage) {
      throw new ErrorHandler(404, 'Page not found', 'INVALID');
    }
    const { startIndex, perPage } = paginationUtil(page, limit);
    const record = await findMany(
      Staff,
      {},
      'name email createdAt role',
      startIndex,
      perPage,
      { path: 'role', model: 'Role', select: 'roleName -_id' }
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

const getStaffService = async (id) => {
  try {
    const staffInfoRecord = await findOne(
      Staff,
      { _id: id },
      '-__v -updatedAt'
    );
    if (!staffInfoRecord) {
      throw new ErrorHandler(404, 'Staff no exists', 'INVALID');
    }
    const populate = [
      { path: 'projectsId', select: 'name' },
      { path: 'skills.techStackId', select: 'name' },
    ];
    const staffExpRecord = await findOne(
      StaffExp,
      { staffId: id },
      '-__v -updatedAt -createdAt',
      populate
    );
    return handleResponse(200, 'Get data successfully', 'SUCCEED', {
      staffInfoRecord,
      staffExpRecord,
    });
  } catch (error) {
    throw error;
  }
};

const createStaffService = async (payload) => {
  try {
    const {
      email,
      password,
      name,
      dob,
      identityNumber,
      phoneNumber,
      address,
      languages,
      certs,
      skills,
      role,
    } = payload;

    const lenAccountRecord = await findLength(Account, { email });
    if (lenAccountRecord === 1) {
      throw new ErrorHandler(404, `Account already exists`, 'INVALID');
    }
    const techStacksId = [];
    skills.forEach((techStack) => techStacksId.push(techStack.techStackId));

    const lenTechStack = await findLength(TechStack, {
      _id: { $in: techStacksId },
    });

    if (lenTechStack !== len(techStacksId)) {
      throw new ErrorHandler(404, 'Tech stack list is not enough', 'INVALID');
    }

    const lenRole = await findLength(Role, { _id: role });

    if (lenRole < 1) {
      throw new ErrorHandler(404, 'Role is not found', 'INVALID');
    }

    const staffId = Types.ObjectId();
    await Promise.all([
      insert(Account, { personalId: staffId, password, email }),
      insert(Staff, {
        _id: staffId,
        email,
        dob,
        name,
        languages,
        certs,
        identityNumber,
        phoneNumber,
        address,
        role,
      }),
      insert(StaffExp, { staffId, skills }),
    ]);
    return handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY',
      { recordId: staffId }
    );
  } catch (error) {
    throw error;
  }
};

const updateStaffService = async (id, payload) => {
  try {
    const lenRecord = await findLength(Staff, { _id: id });
    if (!lenRecord) {
      throw new ErrorHandler('Staff no exists', 'INVALID');
    }
    await updateOne(Staff, { _id: id }, { $set: payload });
    return handleResponse(200, 'Update data successfully', 'SUCCEED');
  } catch (error) {
    throw error;
  }
};

const deleteStaffService = async (id) => {
  try {
    const lenRecord = await findLength(Staff, { _id: id });
    if (!lenRecord) {
      throw new ErrorHandler(404, 'Staff no exists', 'INVALID');
    }
    await Promise.all([
      deleteOne(Staff, { _id: id }),
      deleteOne(StaffExp, { staffId: id }),
      deleteOne(Account, { personalId: id }),
      updateMany(Department, { staffsId: id }, { $pull: { staffsId: id } }),
      updateMany(Project, { staffsId: id }, { $pull: { staffsId: id } }),
    ]);
    return handleResponse(200, 'Update data successfully', 'SUCCEED');
  } catch (error) {
    throw error;
  }
};

const updateStaffExpService = async (id, payload) => {
  try {
    const lenRecord = await findLength(StaffExp, { staffId: id });
    if (!lenRecord) {
      throw new ErrorHandler(404, 'Staff no exists', 'INVALID');
    }
    const techStacksId = [];
    payload.skills.forEach((item) => techStacksId.push(item.techStackId));
    const lenTechStacksRecord = await findLength(
      TechStack,
      {
        _id: { $in: techStacksId },
      },
      'id'
    );
    if (lenTechStacksRecord < len(techStacksId)) {
      throw new ErrorHandler(400, 'Invalid', 'INVALID');
    }
    await updateOne(StaffExp, { staffId: id }, { $set: payload });
    return handleResponse(200, 'Update data successfully', 'SUCCEED');
  } catch (error) {
    throw error;
  }
};

const updateStaffRoleService = async (id, payload) => {
  try {
    const record = await findLength(Role, { staffId: id });
    if (!record) {
      throw new ErrorHandler(404, 'Staff not exists', 'INVALID');
    }
    const { permsId } = payload;
    const permsObjectId = permsId.map((item) => Types.ObjectId(item));
    const permsRecord = await Permission.aggregate([
      //  Always match first to reduce results
      {
        $match: {
          'routes._id': { $in: permsObjectId },
        },
      },
      // Unwind to de-normalize the array elements as documents
      { $unwind: '$routes' },

      // Match to "filter" the array content
      {
        $match: {
          'routes._id': { $in: permsObjectId },
        },
      },
      // Group back to a document with the array
      {
        $group: {
          _id: null,
          routes: { $push: '$routes._id' },
        },
      },
      // Optionally project to remove the "_id" field from results
      {
        $project: {
          _id: 0,
          routes: 1,
        },
      },
    ]);

    if (permsRecord[0].routes.length !== permsObjectId.length) {
      throw new ErrorHandler(404, 'Permission error', 'INVALID');
    }

    await updateOne(Role, { staffId: id }, { $set: payload });
    return handleResponse(200, 'Update data successfully', 'SUCCEED');
  } catch (error) {
    throw error;
  }
};
