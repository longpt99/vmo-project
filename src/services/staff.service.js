import { ErrorHandler, handleResponse } from '../helpers/response.helper';
import {
  Account,
  Department,
  Permission,
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

export {
  getStaffsService,
  getStaffService,
  createStaffService,
  updateStaffService,
  deleteStaffService,
  updateStaffExpService,
  updateStaffRoleService,
};

const getStaffsService = async () => {
  try {
    const record = await findMany(Staff, {});
    return handleResponse(
      200,
      'Get data successfully',
      'GET_DATA_SUCCESSFULLY',
      record
    );
  } catch (error) {
    throw error;
  }
};

const getStaffService = async (id) => {
  try {
    const staffInfoRecord = await findOne(Staff, { _id: id });
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
      '',
      populate
    );
    return handleResponse(
      200,
      'Get data successfully',
      'GET_DATA_SUCCESSFULLY',
      { staffInfoRecord, staffExpRecord }
    );
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
      techStacksId,
      projectsId,
    } = payload;
    const accountRecord = await findOne(Account, { email });
    if (accountRecord) {
      throw new ErrorHandler(404, `Account already exists`, 'INVALID');
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
      }),
      insert(StaffExp, { staffId, techStacksId, projectsId }),
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

const updateStaffService = async (id, payload) => {
  try {
    const record = await findOne(Staff, { _id: id });
    if (!record) {
      throw new ErrorHandler('Staff no exists', 'INVALID');
    }
    await updateOne(Staff, { _id: id }, { $set: payload });
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};

const deleteStaffService = async (id) => {
  try {
    const record = await findOne(Staff, { _id: id });
    if (!record) {
      throw new ErrorHandler('Staff no exists', 'INVALID');
    }
    await Promise.all([
      deleteOne(Staff, { _id: id }),
      deleteOne(StaffExp, { staffId: id }),
      deleteOne(Account, { personalId: id }),
      updateMany(Department, { staffsId: id }, { $pull: { staffsId: id } }),
      updateMany(Project, { staffsId: id }, { $pull: { staffsId: id } }),
    ]);
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};

const updateStaffExpService = async (id, payload) => {
  try {
    const record = await findOne(StaffExp, { staffId: id }, 'id');
    if (!record) {
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
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};

const updateStaffRoleService = async (id, payload) => {
  try {
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
    const record = await findLength(Role, { staffId: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Staff not exists', 'INVALID');
    }
    await updateOne(Role, { staffId: id }, { $set: payload });
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};
