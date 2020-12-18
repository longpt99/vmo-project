import authRouter from '../routes/auth.route';
import techStackRouter from '../routes/techStack.route';
import departmentRouter from '../routes/department.route';
import staffRouter from '../routes/staff.route';
import projectTypeRouter from '../routes/projectType.route';
import projectStatusRouter from '../routes/projectStatus.route';
import projectRouter from '../routes/project.route';
import customerRouter from '../routes/customer.route';
import searchRouter from '../routes/search.route';

export default (app) => {
  app.use('/api', [
    authRouter,
    departmentRouter,
    customerRouter,
    techStackRouter,
    projectRouter,
    staffRouter,
    projectTypeRouter,
    projectStatusRouter,
    searchRouter,
  ]);

  app.get('/', (req, res) => {
    res.send('Server is running');
  });
};
