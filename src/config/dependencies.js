import dotenv from 'dotenv';
import { urlencoded, json } from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

export default (app) => {
  dotenv.config({ path: './src/config/env/.env.dev' });
  app.use(helmet());
  app.use(cors());
  app.use(urlencoded({ extended: false }));
  app.use(json());
};
