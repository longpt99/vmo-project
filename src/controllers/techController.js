import { handleResponse } from '../helpers/response';
import { Tech } from '../models';

export { getTechList, getTechDetail, createTech, updateTech, deleteTech };

const getTechList = async (req, res) => {
  try {
    const techListRecord = await Tech.find({});
    const response = handleResponse(200, '', '', { techList: techListRecord });
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};
const getTechDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const techRecord = await Tech.findById(id);
    const response = handleResponse(200, '', '', techRecord);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};
const createTech = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const techRecord = await Tech.create({
      name,
      description,
      status,
    });
    const response = handleResponse(
      200,
      'Create tech successfully',
      'CREATE_TECH_SUCCESSFULLY',
      techRecord
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};
const updateTech = async (req, res) => {
  try {
    const { id } = req.params;
    const techRecord = await Tech.findByIdAndUpdate(id, {});
    const response = handleResponse(
      200,
      'Update tech successfully',
      'UPDATE_TECH_SUCCESSFULLY',
      techRecord
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};
const deleteTech = async (req, res) => {
  try {
    const { id } = req.params;
    await Tech.findByIdAndDelete(id);
    const response = handleResponse(
      200,
      'Delete tech successfully',
      'DELETE_TECH_SUCCESSFULLY'
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};
