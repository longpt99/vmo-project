import authRouter from '../routes/auth.route';
import techStackRouter from '../routes/techStack.route';
import departmentRouter from '../routes/department.route';
import staffRouter from '../routes/staff.route';
import projectTypeRouter from '../routes/projectType.route';
import projectStatusRouter from '../routes/projectStatus.route';
import projectRouter from '../routes/project.route';
import customerRouter from '../routes/customer.route';

export default (app) => {
  app.use('/api', [
    authRouter,
    departmentRouter,
    techStackRouter,
    projectRouter,
    staffRouter,
    projectTypeRouter,
    customerRouter,
    projectStatusRouter,
  ]);
};
