import { response } from 'express';
import mongoose from 'mongoose';
import { ErrorHandler, handleResponse } from '../helpers/response';
import { Account, Staff, StaffExp } from '../models';

export { getStaffList, getStaffDetail, createStaff };

const getStaffList = async (req, res) => {
  try {
    const staffListRecord = await Staff.find({});
    const response = handleResponse(200, '', '', staffListRecord);
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
      throw new ErrorHandler(404, '', '');
    }
    const response = handleResponse(200, '', '', staffRecord);
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
      techsId,
      projectsId,
    } = req.body;
    console.log(dob);
    const staffId = mongoose.Types.ObjectId();
    await Promise.all([
      Account.create({ personalId: staffId, password, email }),
      Staff.create({
        _id: staffId,
        dob,
        name,
        languages,
        certs,
        identityNumber,
        phoneNumber,
        address,
      }),
      StaffExp.create({ staffId, techsId, projectsId }),
    ]);
    const response = handleResponse(200, '', '');
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const response = handleResponse(200, '', '');
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const response = handleResponse(200, '', '');
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};
