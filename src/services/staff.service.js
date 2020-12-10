import { ErrorHandler, handleError, handleResponse } from '../helpers/response';
import { Account, Staff, StaffExp } from '../models';
import {
  findOne,
  findMany,
  updateOne,
  deleteOne,
  insert,
} from './commonQuery.service';
import { Types } from 'mongoose';

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

// const staffs = [
// {
//   email: "long@gmail.com",
//   password: "long123",
//   name: "Long",
//   phoneNumber: "0987654321",
//   address: "012345678",
// },

//   {
//     email: 'tuan@gmail.com',
//     password: 'long123',
//     name: 'Nguyen Anh Tuan',
//     phoneNumber: '0123456789',
//   },

//   {
//     email: 'dung@gmail.com',
//     password: 'long123',
//     name: 'Vu Quang Dung',
//     phoneNumber: '0123456789',
//   },

//   {
//     email: 'thu@gmail.com',
//     password: 'long123',
//     name: 'Duong Minh Thu',
//     phoneNumber: '0123456789',
//   },

//   {
//     email: 'tien@gmail.com',
//     password: 'long123',
//     name: 'Nguyen Dam Tien',
//     phoneNumber: '0123456789',
//   },

//   {
//     email: 'hiep@gmail.com',
//     password: 'long123',
//     name: 'Pham Quang Hiep',
//     phoneNumber: '0123456789',
//   },

//   {
//     address: null,
//     email: 'rom@gmail.com',
//     password: 'long123',
//     name: 'Ngo Thanh Thuy',
//     phoneNumber: '0123456789',
//   },

//   {
//     email: 'giang@gmail.com',
//     password: 'long123',
//     name: 'Nguyen Quynh Giang',
//     phoneNumber: '0123456789',
//   },

//   {
//     email: 'long.phuong@gmail.com',
//     password: 'long123',
//     name: 'Phuong Thanh Long',
//     phoneNumber: '0123456789',
//   },

//   {
//     email: 'thuy.ngo@gmail.com',
//     password: 'long123',
//     name: 'Ngo Thanh Thuy',
//     phoneNumber: '0123456789',
//   },

//   {
//     email: 'hiep.pham@gmail.com',
//     password: 'long123',
//     name: 'Pham Quang Hiep',
//     phoneNumber: '0123456789',
//   },

//   {
//     email: 'tien.nguyen@gmail.com',
//     password: 'long123',
//     name: 'Nguyen Dam Tien',
//     phoneNumber: '0123456789',
//   },

//   {
//     email: 'thu.duong@gmail.com',
//     password: 'long123',
//     name: 'Duong Minh Thu',
//     phoneNumber: '0123456789',
//   },

//   {
//     email: 'dung.vu@gmail.com',
//     password: 'long123',
//     name: 'Vu Quang Dung',
//     phoneNumber: '0123456789',
//   },

//   {
//     email: 'tuan.nguyen@gmail.com',
//     password: 'long123',
//     name: 'Nguyen Anh Tuan',
//     phoneNumber: '0123456789',
//   },

//   {
//     email: 'admin01@gmail.com',
//     password: 'long123',
//     name: 'Administrater',
//     phoneNumber: '0123456789',
//   },
// ];
