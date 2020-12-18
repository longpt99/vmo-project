import express from 'express';
import database from './config/database';
import dependencies from './config/dependencies';
import routes from './config/routes';
import { errorHandler, initialAccount } from './middlewares';
import { Permission, Role } from './models';

const app = express();

dependencies(app);
database();
app.use(initialAccount);
routes(app);
app.use(errorHandler);

app.post('/permissions', async (req, res) => {
  await Permission.create(req.body);
  return res.json('Success');
});

app.put('/permissions/:id', async (req, res) => {
  await Permission.update(
    { _id: req.params.id },
    {
      $push: {
        routes: req.body,
      },
    }
  );
  return res.json('Success');
});

app.post('/roles', async (req, res) => {
  await Role.create(req.body);
  return res.json('Success');
});

export default app;
