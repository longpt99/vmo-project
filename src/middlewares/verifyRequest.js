import { promises as fs } from 'fs';
import Ajv from 'ajv';
import path from 'path';
import { ErrorHandler } from '../helpers/response';

export default async (req, res, next) => {
  try {
    const routePath = req.route.path;
    const { method } = req;
    // console.log(path.join(__dirname, '../config/routeSchema.json'));

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
    // console.log(schemaPath);

    const ajv = Ajv({ allErrors: true });
    const validate = ajv.compile(schemaPath);
    console.log(req.body);
    const valid = validate(req.body);
    if (!valid) {
      throw new ErrorHandler(400, validate.errors, 'INVALID_INPUT');
    }
    return next();
  } catch (error) {
    console.log(error.message);
    return res.json(error);
  }
};
