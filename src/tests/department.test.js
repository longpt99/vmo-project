import { expect } from 'chai';
import sinon from 'sinon';
import { Department } from '../models';
import {
  getDepartmentService,
  getDepartmentsService,
  createDepartmentService,
  deleteDepartmentService,
} from '../services/department.service';

export default () => {};

describe('DEPARTMENT TESTING', () => {
  let departmentFind;
  let departmentCreate;
  let departmentDelete;

  beforeEach(() => {
    departmentFind = sinon.stub(Department, 'findOne');
    departmentCreate = sinon.stub(Department, 'create');
    departmentDelete = sinon.stub(Department, 'deleteOne');
  });

  afterEach(() => {
    departmentFind.restore();
    departmentCreate.restore();
    departmentDelete.restore();
  });

  it('Should return array data', async () => {
    const result = await getDepartmentsService();
    expect(result.data).to.be.an('array');
  });

  it('Should return one Department', async () => {
    const account = { name: 'Long' };
    departmentFind.resolves(account);
    const result = await getDepartmentService();
    expect(departmentFind.calledOnce).to.be.true;
    expect(result.status).to.equal(200);
  });

  it('Should return success when a new Department created', async () => {
    const account = { name: 'Long' };
    departmentCreate.resolves(account);
    const result = await createDepartmentService(account);
    expect(result.status).to.equal(200);
    expect(result.message).to.equal('Create data successfully');
  });

  it('Should return fail because Department already exits', async () => {
    try {
      const account = { name: 'Long' };
      departmentFind.resolves(account);
      const result = await createDepartmentService(account);
      expect(result.error).to.equal('numberA must be a number');
    } catch (error) {
      expect(error.message).to.equal('Department already exists');
    }
  });

  it('Should return success when Department was deleted', async () => {
    const account = { name: 'Long' };
    departmentFind.resolves(account);
    departmentDelete.resolves(account);
    const result = await deleteDepartmentService(account);
    expect(result.message).to.equal('Delete data successfully');
  });
});
