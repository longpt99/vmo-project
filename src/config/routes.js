import authRouter from '../routes/auth';
import techStackRouter from '../routes/techStack';
import departmentRouter from '../routes/department';
import staffRouter from '../routes/staff';
import projectCategoryRouter from '../routes/projectCategory';
import projectRouter from '../routes/project';
import customerRouter from '../routes/customer';

export default (app) => {
  app.use('/api', [
    authRouter,
    departmentRouter,
    techStackRouter,
    projectRouter,
    staffRouter,
    projectCategoryRouter,
    customerRouter,
  ]);
};
