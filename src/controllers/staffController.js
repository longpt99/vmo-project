import mongoose from 'mongoose';
import { ErrorHandler, handleResponse } from '../helpers/response';
import { Account, Staff, StaffExp } from '../models';

export { getStaffList, getStaffDetail, createStaff, updateStaff, deleteStaff };

const getStaffList = async (req, res) => {
  try {
    const records = await Staff.find({});
    const response = handleResponse(
      200,
      'Get data successfully',
      'GET_DATA_SUCCESSFULLY',
      { records }
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const getStaffDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const staffRecord = await Staff.findOne({ _id: id });
    if (!staffRecord) {
      throw new ErrorHandler(404, 'Staff not exists', 'INVALID');
    }
    const response = handleResponse(
      200,
      'Get data successfully',
      'GET_DATA_SUCCESSFULLY',
      { staffRecord }
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const createStaff = async (req, res) => {
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
    } = req.body;

    const accountRecord = await Account.findOne({ email });

    if (accountRecord) {
      throw new ErrorHandler(
        404,
        'Email already exists',
        'EMAIL_ALREADY_EXISTS'
      );
    }
    const staffId = mongoose.Types.ObjectId();

    await Promise.all([
      Account.create({ personalId: staffId, password, email }),
      Staff.create({
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
      StaffExp.create({ staffId, techStacksId, projectsId }),
    ]);
    const response = handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY'
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const staffRecord = await Staff.findOne({ _id: id }, 'id');
    if (!staffRecord) {
      throw new ErrorHandler(404, 'Staff not exists', 'INVALID');
    }
    await Staff.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...req.body,
        },
      }
    );
    const response = handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
    return res.status(response.status).json(response);
  } catch (error) {
    console.log(error.message);
    return res.status(error.status).json(error);
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const staffRecord = await Staff.findOne({ _id: id }, 'id');
    if (!staffRecord) {
      throw new ErrorHandler(404, 'Staff not exists', 'INVALID');
    }
    await Staff.deleteOne({ _id: id });
    const response = handleResponse(
      200,
      'Delete data successfully',
      'DELETE_DATA_SUCCESSFULLY'
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};
