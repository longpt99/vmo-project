import { ErrorHandler } from '../helpers/response.helper';
import logger from '../helpers/logger.helper';

export default (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    logger(err);
    return res.status(err.status).json(err);
  }
  logger({ message: err.message });
  return res.status(500).json({ err: err.message });
};
