import User from '../models/userModel';

export { findUserById };

const findUserById = async (id) => {
  const user = await User.findById(id);
};
