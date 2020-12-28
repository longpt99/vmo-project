import express from 'express';
import database from './config/database';
import dependencies from './config/dependencies';
import routes from './config/routes';
import swagger from './config/swagger';
import { errorHandler, initialAccount } from './middlewares';

const app = express();

dependencies(app);
database();
app.use(initialAccount);
routes(app);
app.use(errorHandler);
swagger(app);

export default app;
