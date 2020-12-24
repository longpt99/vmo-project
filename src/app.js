import express from 'express';
import database from './config/database';
import dependencies from './config/dependencies';
import routes from './config/routes';
import { errorHandler, initialAccount } from './middlewares';

const app = express();

dependencies(app);
database();
app.use(initialAccount);
routes(app);
app.use(errorHandler);

export default app;
