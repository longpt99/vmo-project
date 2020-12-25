import {
  getDepartmentService,
  getDepartmentsService,
  updateDepartmentService,
  deleteDepartmentService,
  createDepartmentService,
} from '../services/department.service';

export {
  createDepartment,
  getDepartmentDetail,
  getDepartmentList,
  updateDepartment,
  deleteDepartment,
};

const getDepartmentList = async (req, res, next) => {
  try {
    const response = await getDepartmentsService(req.query);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const getDepartmentDetail = async (req, res, next) => {
  try {
    const response = await getDepartmentService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const createDepartment = async (req, res, next) => {
  try {
    const response = await createDepartmentService(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const updateDepartment = async (req, res, next) => {
  try {
    const response = await updateDepartmentService(req.params.id, req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

const deleteDepartment = async (req, res, next) => {
  try {
    const response = await deleteDepartmentService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
};

// const depts = [
//   {
//     name: 'd1',
//     description: 'mean stack',
//     staffsId: [
//       '5fc894f59092ca2c6cf2bb06',
//       '5fc895380aa2402cacb728be',
//       '5fc895490aa2402cacb728c2',
//       '5fc8955b0aa2402cacb728c6',
//     ],
//     projectsId: [],
//     techStacksId: [
//       '5fc997febb22550607a9103f',
//       '5fc997febb22550607a91044',
//       '5fc997febb22550607a91046',
//       '5fc997febb22550607a91041',
//       '5fc997febb22550607a91048',
//       '5fc997febb22550607a91056',
//     ],
//   },
//   {
//     name: 'd2',
//     description: 'mern stack',
//     staffsId: [
//       '5fc8956d0aa2402cacb728ca',
//       '5fc8957c0aa2402cacb728ce',
//       '5fc895cd33cc1f2cfa1144e1',
//       '5fc896b7fb137e2d82f0cf47',
//     ],
//     projectsId: [],
//     techStacksId: [
//       '5fc997febb22550607a9103f',
//       '5fc997febb22550607a91040',
//       '5fc997febb22550607a91041',
//       '5fc997febb22550607a91046',
//       '5fc997febb22550607a91048',
//       '5fc997febb22550607a91056',
//     ],
//   },
//   {
//     name: 'd3',
//     description: 'testing',
//     staffsId: [
//       '5fc896dafb137e2d82f0cf4b',
//       '5fc896ebfb137e2d82f0cf4f',
//       '5fc896f3fb137e2d82f0cf53',
//     ],
//     projectsId: [],
//     techStacksId: [
//       '5fc997febb22550607a91049',
//       '5fc997febb22550607a9104a',
//       '5fc997febb22550607a9104b',
//       '5fc997febb22550607a9104f',
//     ],
//   },
//   {
//     name: 'd4',
//     description: 'ai & machine learing',
//     staffsId: [
//       '5fc896fafb137e2d82f0cf57',
//       '5fc89701fb137e2d82f0cf5b',
//       '5fc89709fb137e2d82f0cf5f',
//       '5fc8970efb137e2d82f0cf63',
//     ],
//     projectsId: [],
//     techStacksId: ['5fc9aba9db99bbbe75edb153'],
//   },
// ];
