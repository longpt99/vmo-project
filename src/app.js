import express from 'express';
import database from './config/database';
import dependencies from './config/dependencies';
import logger from './helpers/logger';
import routes from './config/routes';
import initialAccount from './middlewares/initialAccount';

const app = express();

dependencies(app);
database();
app.use(initialAccount);
routes(app);

export default app;
