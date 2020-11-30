import { Error } from 'mongoose';
import { ErrorHandler, handleResponse } from '../helpers/response';
import { Tech, Office, Project, Staff, StaffExp } from '../models';
import len from '../services/arrayLength';

export { createOffice, getOfficeDetail, getOfficeList };

const getOfficeList = async (req, res) => {
  try {
    const officeListRecord = await Office.find({});
    const response = handleResponse(200, '', '', officeListRecord);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const getOfficeDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const officeRecord = await Office.findOne({ _id: id });
    if (!officeRecord) {
      throw new ErrorHandler(404, '', '');
    }
    const response = handleResponse(200, '', '', officeRecord);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const createOffice = async (req, res) => {
  try {
    const {
      name,
      description,
      staffsId = [],
      projectsId = [],
      techsId = [],
    } = req.body;

    const officeRecord = await Office.findOne({
      name,
    }).select({ _id: 1 });

    if (officeRecord) {
      throw new ErrorHandler(400, 'Office has exists', 'OFFICE_HAS_EXISTS');
    }

    const techsRecord = await Tech.find({
      _id: {
        $in: techsId,
      },
    });

    if (len(techsRecord) < len(techsId)) {
      throw new ErrorHandler(400, '', 'ERROR_TECH');
    }

    const staffsRecord = await Staff.find({
      _id: {
        $in: staffsId,
      },
    });

    if (len(staffsRecord) < len(staffsId)) {
      throw new ErrorHandler(400, '', 'ERROR_STAFF');
    }

    const projectsRecord = await Project.find({
      _id: {
        $in: projectsId,
      },
    });

    if (len(projectsRecord) < len(projectsId)) {
      throw new ErrorHandler(400, '', 'ERROR_PROJECT');
    }

    await Office.create({
      name,
      description,
      staffsId,
      projectsId,
      techsId,
    });

    const response = handleResponse(
      200,
      'Create office successfully',
      'CREATE_OFFICE_SUCCESSFULLY'
    );
    return res.status(response.status).json(response);
  } catch (error) {
    const stt = error instanceof ErrorHandler ? error.status : 400;
    return res.status(stt).json(error);
  }
};

const updateOffice = async (req, res) => {
  try {
    const { id } = req.params;
    const officeRecord = await Office.findById(id);

    if (!officeRecord) {
      throw new ErrorHandler(404, '', '');
    }

    await Office.updateOne({ ...req.body });
    const response = handleResponse(200, '', '');
    return res.status(response.status).json(response);
  } catch (error) {
    res.status(error.status).json(error);
  }
};

const deleteOffice = async (req, res) => {
  try {
    const { id } = req.params;
    const officeRecord = await Office.findById(id);

    if (!officeRecord) {
      throw new ErrorHandler(404, '', '');
    }
    await Office.deleteOne({ id });
    const response = handleResponse(200, '', '');
    return res.status(response.status).json(response);
  } catch (error) {
    res.status(error.status).json(error);
  }
};
