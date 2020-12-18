import { expect } from 'chai';
import sinon from 'sinon';
import { ProjectType } from '../models';
import {
  getProjectTypeService,
  getProjectTypesService,
  createProjectTypeService,
  deleteProjectTypeService,
} from '../services/projectType.service';

describe('PROJECT TYPE TESTING', () => {
  let projectTypeFind;
  let projectTypeCreate;

  beforeEach(() => {
    projectTypeFind = sinon.stub(ProjectType, 'findOne');
    projectTypeCreate = sinon.stub(ProjectType, 'create');
  });

  afterEach(() => {
    projectTypeFind.restore();
    projectTypeCreate.restore();
  });

  it('Should return array data', async () => {
    const result = await getProjectTypesService();
    expect(result.data).to.be.an('array');
  });

  it('Should return one ProjectType', async () => {
    const account = { name: 'Long' };
    projectTypeFind.resolves(account);
    const result = await getProjectTypeService();
    expect(projectTypeFind.calledOnce).to.be.true;
    expect(result.status).to.equal(200);
  });

  it('Should return success when a new project Type created', async () => {
    const account = { name: 'Long' };
    projectTypeCreate.resolves(account);
    const result = await createProjectTypeService(account);
    expect(result.status).to.equal(200);
    expect(result.message).to.equal('Create data successfully');
  });

  it('Should return fail because ProjectType already exits', async () => {
    try {
      const account = { name: 'Long' };
      projectTypeFind.resolves(account);
      const result = await createProjectTypeService(account);
    } catch (error) {
      expect(error.message).to.equal('Project type already exists');
    }
  });

  it('Should return success when ProjectType was deleted', async () => {
    const account = { name: 'Long' };
    projectTypeFind.resolves(account);
    const result = await deleteProjectTypeService();
    expect(result.message).to.equal('Delete data successfully');
  });
});
