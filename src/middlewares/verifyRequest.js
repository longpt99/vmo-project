import { promises as fs } from 'fs';
import Ajv from 'ajv';
import path from 'path';
import { ErrorHandler } from '../helpers/response';
import logger from '../helpers/logger';

export default async (req, res, next) => {
  try {
    const routePath = req.route.path;
    const { method } = req;
    const filePath = JSON.parse(
      await fs.readFile(
        path.join(__dirname, '../config/routeSchema.json'),
        'utf8'
      )
    );

    const schemaPath = JSON.parse(
      await fs.readFile(
        path.join(__dirname, `../${filePath[method][routePath]}`),
        'utf8'
      )
    );
    const ajv = Ajv({ allErrors: true });
    const validate = ajv.compile(schemaPath);
    const valid = validate(req.body);
    if (!valid) {
      throw new ErrorHandler(400, validate.errors, 'INVALID_INPUT');
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
