import { expect } from 'chai';
import sinon from 'sinon';
import { ProjectStatus } from '../models';
import {
  getProjectStatusService,
  getProjectStatusesService,
  createProjectStatusService,
  deleteProjectStatusService,
} from '../services/projectStatus.service';

describe('PROJECT STATUS TESTING', () => {
  let projectStatusFind;
  let projectStatusCreate;

  beforeEach(() => {
    projectStatusFind = sinon.stub(ProjectStatus, 'findOne');
    projectStatusCreate = sinon.stub(ProjectStatus, 'create');
  });

  afterEach(() => {
    projectStatusFind.restore();
    projectStatusCreate.restore();
  });

  it('Should return array data', async () => {
    const result = await getProjectStatusesService();
    expect(result.data).to.be.an('array');
  });

  it('Should return one project status', async () => {
    const account = { name: 'Long' };
    projectStatusFind.resolves(account);
    const result = await getProjectStatusService();
    expect(projectStatusFind.calledOnce).to.be.true;
    expect(result.status).to.equal(200);
  });

  it('Should return success when a new project status created', async () => {
    const account = { name: 'Long' };
    projectStatusCreate.resolves(account);
    const result = await createProjectStatusService(account);
    expect(result.status).to.equal(200);
    expect(result.message).to.equal('Create data successfully');
  });

  it('Should return fail because project status already exits', async () => {
    try {
      const account = { name: 'Long' };
      projectStatusFind.resolves(account);
      const result = await createProjectStatusService(account);
    } catch (error) {
      expect(error.message).to.equal('Project status already exists');
    }
  });

  it('Should return success when project status was deleted', async () => {
    const account = { name: 'Long' };
    projectStatusFind.resolves(account);
    const result = await deleteProjectStatusService();
    expect(result.message).to.equal('Delete data successfully');
  });
});
