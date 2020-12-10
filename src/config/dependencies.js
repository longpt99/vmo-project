import dotenv from 'dotenv';
import { urlencoded, json } from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

export default (app) => {
  app.use(compression());
  dotenv.config({ path: './src/config/env/.env.dev' });
  app.use(helmet());
  app.use(cors());
  app.use(urlencoded({ extended: false }));
  app.use(json());
};
