import techRouter from '../routes/techRoute';
// import authRouter from '../routes/authRoute';
// import officeRouter from '../routes/officeRoute';
import projectRouter from '../routes/projectRoute';
import staffRouter from '../routes/staffRoute';

export default (app) => {
  app.use('/api', [techRouter, projectRouter, staffRouter]);
};
