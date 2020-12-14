import { ErrorHandler, handleResponse } from '../helpers/response';
import { Department, Project, Staff, TechStack } from '../models';
import {
  findOne,
  findMany,
  updateOne,
  deleteOne,
  insert,
  updateMany,
} from './commonQuery.service';

import len from './arrayLength';

export {
  getDepartmentService,
  createDepartmentService,
  getDepartmentsService,
  updateDepartmentService,
  deleteDepartmentService,
};

const getDepartmentsService = async () => {
  try {
    const record = await findMany(Department, {});
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

const getDepartmentService = async (id) => {
  try {
    const populate = [
      { path: 'techStacksId', select: 'name status' },
      { path: 'projectsId', select: 'name' },
      { path: 'staffsId', select: 'name' },
    ];
    const record = await findOne(Department, { _id: id }, '', populate);
    if (!record) {
      throw new ErrorHandler(404, 'Department not exists', 'INVALID');
    }
    return handleResponse(
      200,
      'Get data successfully',
      'GET_DATA_SUCCESSFULLY',
      { record }
    );
  } catch (error) {
    throw error;
  }
};

const createDepartmentService = async (payload) => {
  try {
    const {
      name,
      description,
      staffsId,
      projectsId,
      techStacksId,
      remove,
    } = payload;

    const deptRecord = await findOne(Department, { name }, 'id');
    if (deptRecord) {
      throw new ErrorHandler(404, 'Department already exists', 'INVALID');
    }
    const techStacksRecord = await findMany(
      TechStack,
      { _id: { $in: techStacksId } },
      'id'
    );

    if (len(techStacksRecord) < len(techStacksId)) {
      throw new ErrorHandler(400, 'Invalid', 'INVALID');
    }

    const staffsRecord = await findMany(
      Staff,
      { _id: { $in: staffsId } },
      'id'
    );

    if (len(staffsRecord) < len(staffsId)) {
      throw new ErrorHandler(400, 'Invalid', 'INVALID');
    }

    const projectsRecord = await findMany(
      Project,
      { _id: { $in: projectsId } },
      'id'
    );

    if (len(projectsRecord) < len(projectsId)) {
      throw new ErrorHandler(400, 'Invalid', 'INVALID');
    }
    await insert(Department, {
      name,
      description,
      staffsId,
      projectsId,
      techStacksId,
    });
    const response = handleResponse(
      200,
      'Create data successfully',
      'CREATE_DATA_SUCCESSFULLY'
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const updateDepartmentService = async (id, payload) => {
  try {
    const record = await findOne(Department, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Department not exists', 'INVALID');
    }
    await updateOne(Department, { _id: id }, { $set: payload.update });
    await updateMany(
      Project,
      { _id: { $in: payload.remove.projectsId } },
      { $pull: { departmentsId: id } }
    );
    return handleResponse(
      200,
      'Update data successfully',
      'UPDATE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};

const deleteDepartmentService = async (id) => {
  try {
    const record = await findOne(Department, { _id: id }, 'id');
    if (!record) {
      throw new ErrorHandler(404, 'Department not exists', 'INVALID');
    }
    await deleteOne(Department, { _id: id });
    return handleResponse(
      200,
      'Delete data successfully',
      'DELETE_DATA_SUCCESSFULLY'
    );
  } catch (error) {
    throw error;
  }
};

// const depts = [
//   {
//     techStacksId: [
//       ObjectId('5fc997febb22550607a9103f'),
//       ObjectId('5fc997febb22550607a91044'),
//       ObjectId('5fc997febb22550607a91046'),
//       ObjectId('5fc997febb22550607a91041'),
//       ObjectId('5fc997febb22550607a91048'),
//       ObjectId('5fc997febb22550607a91056'),
//     ],
//     projectsId: [],
//     staffsId: [
//       ObjectId('5fc894f59092ca2c6cf2bb06'),
//       ObjectId('5fc895380aa2402cacb728be'),
//       ObjectId('5fc895490aa2402cacb728c2'),
//       ObjectId('5fc8955b0aa2402cacb728c6'),
//     ],
//     name: 'd1',
//     description: 'mean stack',
//     __v: 0,
//     createdAt: ISODate('2020-12-04T10:37:42.513+07:00'),
//     updatedAt: ISODate('2020-12-08T15:36:39.001+07:00'),
//   },

//   {
//     _id: ObjectId('5fc9af06bcc25313a324b3e2'),
//     techStacksId: [
//       ObjectId('5fc997febb22550607a9103f'),
//       ObjectId('5fc997febb22550607a91040'),
//       ObjectId('5fc997febb22550607a91041'),
//       ObjectId('5fc997febb22550607a91046'),
//       ObjectId('5fc997febb22550607a91048'),
//       ObjectId('5fc997febb22550607a91056'),
//     ],
//     projectsId: [],
//     staffsId: [
//       ObjectId('5fc8956d0aa2402cacb728ca'),
//       ObjectId('5fc8957c0aa2402cacb728ce'),
//       ObjectId('5fc895cd33cc1f2cfa1144e1'),
//       ObjectId('5fc896b7fb137e2d82f0cf47'),
//     ],
//     name: 'd2',
//     description: 'mern stack',
//     __v: 0,
//     createdAt: ISODate('2020-12-04T10:37:42.514+07:00'),
//     updatedAt: ISODate('2020-12-04T10:37:42.514+07:00'),
//   },

//   {
//     _id: ObjectId('5fc9af06bcc25313a324b3e3'),
//     techStacksId: [
//       ObjectId('5fc997febb22550607a91049'),
//       ObjectId('5fc997febb22550607a9104a'),
//       ObjectId('5fc997febb22550607a9104b'),
//       ObjectId('5fc997febb22550607a9104f'),
//     ],
//     projectsId: [
//       ObjectId('5fcf35c09ef5740e90d21ce1'),
//       ObjectId('5fcf36c49ef5740e90d21ce4'),
//       ObjectId('5fcf36c59ef5740e90d21ce7'),
//       ObjectId('5fcf36c69ef5740e90d21cea'),
//       ObjectId('5fcf36c69ef5740e90d21ced'),
//       ObjectId('5fcf3820408e8f0f2865a80f'),
//       ObjectId('5fcf3820408e8f0f2865a812'),
//       ObjectId('5fcf3821408e8f0f2865a815'),
//       ObjectId('5fcf3822408e8f0f2865a818'),
//       ObjectId('5fcf3823408e8f0f2865a81b'),
//       ObjectId('5fcf3824408e8f0f2865a81e'),
//       ObjectId('5fcf3825408e8f0f2865a821'),
//       ObjectId('5fcf38860a0a3d0f74a86de4'),
//       ObjectId('5fcf38870a0a3d0f74a86de7'),
//       ObjectId('5fcf38880a0a3d0f74a86dea'),
//       ObjectId('5fcf38880a0a3d0f74a86ded'),
//       ObjectId('5fcf38890a0a3d0f74a86df0'),
//       ObjectId('5fcf38890a0a3d0f74a86df3'),
//       ObjectId('5fcf388a0a0a3d0f74a86df6'),
//       ObjectId('5fcf388b0a0a3d0f74a86df9'),
//       ObjectId('5fcf388b0a0a3d0f74a86dfc'),
//       ObjectId('5fcf388c0a0a3d0f74a86dff'),
//       ObjectId('5fcf388c0a0a3d0f74a86e02'),
//       ObjectId('5fcf388d0a0a3d0f74a86e05'),
//       ObjectId('5fcf388d0a0a3d0f74a86e08'),
//       ObjectId('5fcf38c4b174410f9a0c7590'),
//       ObjectId('5fcf38c5b174410f9a0c7593'),
//       ObjectId('5fcf38c6b174410f9a0c7596'),
//       ObjectId('5fcf38c7b174410f9a0c7599'),
//       ObjectId('5fcf38c7b174410f9a0c759c'),
//       ObjectId('5fcf38c8b174410f9a0c759f'),
//       ObjectId('5fcf38c9b174410f9a0c75a2'),
//       ObjectId('5fcf38c9b174410f9a0c75a5'),
//       ObjectId('5fcf38cab174410f9a0c75a8'),
//       ObjectId('5fcf38e6ea03d30fc0ccd579'),
//       ObjectId('5fcf38e7ea03d30fc0ccd57c'),
//       ObjectId('5fcf38e8ea03d30fc0ccd57f'),
//       ObjectId('5fcf38e9ea03d30fc0ccd582'),
//       ObjectId('5fcf38eaea03d30fc0ccd585'),
//       ObjectId('5fcf3b11ea03d30fc0ccd588'),
//       ObjectId('5fcf3b12ea03d30fc0ccd58b'),
//       ObjectId('5fcf3b12ea03d30fc0ccd58e'),
//       ObjectId('5fcf3b13ea03d30fc0ccd591'),
//       ObjectId('5fcf3b13ea03d30fc0ccd594'),
//       ObjectId('5fcf3b14ea03d30fc0ccd597'),
//       ObjectId('5fcf3b14ea03d30fc0ccd59a'),
//       ObjectId('5fcf3b15ea03d30fc0ccd59d'),
//       ObjectId('5fcf3b15ea03d30fc0ccd5a0'),
//       ObjectId('5fcf3b16ea03d30fc0ccd5a3'),
//       ObjectId('5fcf3b16ea03d30fc0ccd5a6'),
//       ObjectId('5fcf3b17ea03d30fc0ccd5a9'),
//     ],
//     staffsId: [
//       ObjectId('5fc896dafb137e2d82f0cf4b'),
//       ObjectId('5fc896ebfb137e2d82f0cf4f'),
//       ObjectId('5fc896f3fb137e2d82f0cf53'),
//     ],
//     name: 'd3',
//     description: 'testing',
//     __v: 0,
//     createdAt: ISODate('2020-12-04T10:37:42.514+07:00'),
//     updatedAt: ISODate('2020-12-08T15:36:39.001+07:00'),
//   },

//   {
//     _id: ObjectId('5fc9af06bcc25313a324b3e4'),
//     techStacksId: [ObjectId('5fc9aba9db99bbbe75edb153')],
//     projectsId: [],
//     staffsId: [
//       ObjectId('5fc896fafb137e2d82f0cf57'),
//       ObjectId('5fc89701fb137e2d82f0cf5b'),
//       ObjectId('5fc89709fb137e2d82f0cf5f'),
//       ObjectId('5fc8970efb137e2d82f0cf63'),
//     ],
//     name: 'd4',
//     description: 'ai & machine learing',
//     __v: 0,
//     createdAt: ISODate('2020-12-04T10:37:42.514+07:00'),
//     updatedAt: ISODate('2020-12-04T10:37:42.514+07:00'),
//   },

//   {
//     _id: ObjectId('5fc9af1584619b13c9d61ecb'),
//     techStacksId: [
//       ObjectId('5fc997febb22550607a9103f'),
//       ObjectId('5fc997febb22550607a91044'),
//       ObjectId('5fc997febb22550607a91046'),
//       ObjectId('5fc997febb22550607a91041'),
//       ObjectId('5fc997febb22550607a91048'),
//       ObjectId('5fc997febb22550607a91056'),
//     ],
//     projectsId: [],
//     staffsId: [
//       ObjectId('5fc894f59092ca2c6cf2bb06'),
//       ObjectId('5fc895380aa2402cacb728be'),
//       ObjectId('5fc895490aa2402cacb728c2'),
//       ObjectId('5fc8955b0aa2402cacb728c6'),
//     ],
//     name: 'd1',
//     description: 'mean stack',
//     __v: 0,
//     createdAt: ISODate('2020-12-04T10:37:57.880+07:00'),
//     updatedAt: ISODate('2020-12-04T10:37:57.880+07:00'),
//   },

//   {
//     _id: ObjectId('5fc9af1584619b13c9d61ecc'),
//     techStacksId: [
//       ObjectId('5fc997febb22550607a9103f'),
//       ObjectId('5fc997febb22550607a91040'),
//       ObjectId('5fc997febb22550607a91041'),
//       ObjectId('5fc997febb22550607a91046'),
//       ObjectId('5fc997febb22550607a91048'),
//       ObjectId('5fc997febb22550607a91056'),
//     ],
//     projectsId: [],
//     staffsId: [
//       ObjectId('5fc8956d0aa2402cacb728ca'),
//       ObjectId('5fc8957c0aa2402cacb728ce'),
//       ObjectId('5fc895cd33cc1f2cfa1144e1'),
//       ObjectId('5fc896b7fb137e2d82f0cf47'),
//     ],
//     name: 'd2',
//     description: 'mern stack',
//     __v: 0,
//     createdAt: ISODate('2020-12-04T10:37:57.881+07:00'),
//     updatedAt: ISODate('2020-12-04T10:37:57.881+07:00'),
//   },

//   {
//     _id: ObjectId('5fc9af1584619b13c9d61ecd'),
//     techStacksId: [
//       ObjectId('5fc997febb22550607a91049'),
//       ObjectId('5fc997febb22550607a9104a'),
//       ObjectId('5fc997febb22550607a9104b'),
//       ObjectId('5fc997febb22550607a9104f'),
//     ],
//     projectsId: [],
//     staffsId: [
//       ObjectId('5fc896dafb137e2d82f0cf4b'),
//       ObjectId('5fc896ebfb137e2d82f0cf4f'),
//       ObjectId('5fc896f3fb137e2d82f0cf53'),
//     ],
//     name: 'd3',
//     description: 'testing',
//     __v: 0,
//     createdAt: ISODate('2020-12-04T10:37:57.881+07:00'),
//     updatedAt: ISODate('2020-12-04T10:37:57.881+07:00'),
//   },

//   {
//     _id: ObjectId('5fc9af1584619b13c9d61ece'),
//     techStacksId: [ObjectId('5fc9aba9db99bbbe75edb153')],
//     projectsId: [],
//     staffsId: [
//       ObjectId('5fc896fafb137e2d82f0cf57'),
//       ObjectId('5fc89701fb137e2d82f0cf5b'),
//       ObjectId('5fc89709fb137e2d82f0cf5f'),
//       ObjectId('5fc8970efb137e2d82f0cf63'),
//     ],
//     name: 'd4',
//     description: 'ai & machine learing',
//     __v: 0,
//     createdAt: ISODate('2020-12-04T10:37:57.882+07:00'),
//     updatedAt: ISODate('2020-12-04T10:37:57.882+07:00'),
//   },
// ];
