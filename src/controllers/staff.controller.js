import mongoose from 'mongoose';
import { ErrorHandler, handleResponse } from '../helpers/response';
import { Account, Staff, StaffExp } from '../models';
import {
  createStaffService,
  deleteStaffService,
  getStaffService,
  getStaffsService,
  updateStaffService,
} from '../services/staff.service';
export { getStaffList, getStaffDetail, createStaff, updateStaff, deleteStaff };

const getStaffList = async (req, res) => {
  try {
    const response = await getStaffsService();
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getStaffDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getStaffService(id);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createStaff = async (req, res) => {
  try {
    const response = await createStaffService(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
