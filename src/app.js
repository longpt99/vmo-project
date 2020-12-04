import express from 'express';
import database from './config/database';
import dependencies from './config/dependencies';
import logger from './helpers/logger';
import routes from './config/routes';

const app = express();

dependencies(app);
database();
routes(app);

export default app;
