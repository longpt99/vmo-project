import techRouter from '../routes/techRoute';
import projectRouter from '../routes/projectRoute';
import staffRouter from '../routes/staffRoute';
import officeRouter from '../routes/officeRoute';
import customerRouter from '../routes/customerRoute';
import accountRouter from '../routes/authRoute';
import searchRouter from '../routes/searchRoute';

export default (app) => {
  app.use('/api', [
    accountRouter,
    techRouter,
    projectRouter,
    staffRouter,
    officeRouter,
    customerRouter,
    searchRouter,
  ]);
};
