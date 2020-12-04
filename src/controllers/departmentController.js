import { ErrorHandler, handleResponse } from '../helpers/response';
import { TechStack, Department, Project } from '../models';

export {
  createDepartment,
  getDepartmentDetail,
  getDepartmentList,
  updateDepartment,
  deleteDepartment,
};

const getDepartmentList = async (req, res) => {
  try {
    const records = await Department.find({});
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

const getDepartmentDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Department.findOne({ _id: id });
    if (!record) {
      throw new ErrorHandler(404, 'Data not exist', 'INVALID');
    }
    const response = handleResponse(
      200,
      'Get data successfully',
      'GET_DATA_SUCCESSFULLY',
      { record }
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const createDepartment = async (req, res) => {
  try {
    const { name, description, staffsId, projectsId, techStacksId } = req.body;

    const techStacksRecord = await TechStack.find(
      {
        _id: {
          $in: techStacksId,
        },
      },
      'id'
    );

    if (len(techStacksRecord) < len(techStacksId)) {
      throw new ErrorHandler(400, 'Invalid', 'INVALID');
    }

    const staffsRecord = await Staff.find(
      {
        _id: {
          $in: staffsId,
        },
      },
      'id'
    );

    if (len(staffsRecord) < len(staffsId)) {
      throw new ErrorHandler(400, 'Invalid', 'INVALID');
    }

    const projectsRecord = await Project.find(
      {
        _id: {
          $in: projectsId,
        },
      },
      'id'
    );

    if (len(projectsRecord) < len(projectsId)) {
      throw new ErrorHandler(400, 'Invalid', 'INVALID');
    }

    await Department.create({
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
    return res.status(response.status).json(response);
  } catch (error) {
    console.log(error.message);
    if (error instanceof ErrorHandler) {
      res.status(error.status);
    }
    return res.json(error);
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Department.findById(id);

    if (!record) {
      throw new ErrorHandler(404, 'Department not exists', 'INVALID');
    }
    await Department.updateOne(
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
    res.status(error.status).json(error);
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Department.findOne({ _id: id });
    if (!record) {
      throw new ErrorHandler(404, 'Department not exists', 'INVALID');
    }
    await Department.deleteOne({ id });
    const response = handleResponse(
      200,
      'Delete data successfully',
      'DELETE_DATA_SUCCESSFULLY'
    );
    return res.status(response.status).json(response);
  } catch (error) {
    res.status(error.status).json(error);
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
