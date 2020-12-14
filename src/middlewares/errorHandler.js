import { ErrorHandler } from '../helpers/response';

export default (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.status).json(err);
  }
  return res.status(500).json({ err: err.message });
};
