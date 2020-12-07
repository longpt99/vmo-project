import { handleError } from '../helpers/response';
import { Account, Staff, StaffExp } from '../models';
import {
  findOne,
  findMany,
  updateOne,
  deleteOne,
  insertOne,
} from './commonQuery.service';

export {
  getStaffsService,
  getStaffService,
  createStaffService,
  updateStaffService,
  deleteStaffService,
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
    return handleError(error);
  }
};

const getStaffService = async (id) => {
  try {
    const record = await findOne(Staff, { _id: id });
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
    await findOne(Account, { email });
    const staffId = mongoose.Types.ObjectId();
    await Promise.all([
      insertOne(Account, { personalId: staffId, password, email }),
      insertOne(Staff, {
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
      insertOne(StaffExp, { staffId, techStacksId, projectsId }),
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

const updateStaffService = async (id, payload) => {
  try {
    await findOne(Staff, { _id: id });
    await updateOne(
      Staff,
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

const deleteStaffService = async (id) => {
  try {
    await findOne(Staff, { _id: id });
    await deleteOne(Staff, { _id: id });
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    return handleError(error);
  }
};
