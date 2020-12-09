const { ErrorHandler } = require('../helpers/response');
const { Client } = require('../models');

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw {
        success: false,
        message: 'You must send an Authorization header',
        status: 401,
      };
    }
    const [authType, token] = authorization.trim().split(' ');
    if (authType !== 'Basic') {
      throw {
        success: false,
        message: 'Expected a Basic token',
        status: 401,
      };
    }
    const clientName = await Client.findOne(
      { token },
      { projection: { _id: 0, name: 1 } }
    );
    if (!clientName) {
      throw new ErrorHandler(404, 'Client not found', 'CLIENT_NOT_FOUND');
    }
    req.client = clientName.name;

    return next();
  } catch (error) {
    return res.status(error.status).json(error);
  }
};
