import { Tech, Office } from '../models';

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
    const { description, staffsId, projectsId, techsId } = req.body;

    const techsRecord = await Tech.find({
      _id: {
        $in: techsId,
      },
    });

    const staffsRecord = await Tech.find({
      _id: {
        $in: staffsId,
      },
    });
    await Office.create({
      description,
      staffsId,
      projectsId,
      techsId,
    });
  } catch (error) {
    return res.status(error.status).json(error);
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
