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
    const response = await getStaffService(req.params.id);
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
    const response = await updateStaffService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const response = await deleteStaffService(req.params.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
