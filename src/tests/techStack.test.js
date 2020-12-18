import { expect } from 'chai';
import sinon from 'sinon';
import { TechStack } from '../models';
import {
  getTechStackService,
  getTechStacksService,
  createTechStackService,
  deleteTechStackService,
} from '../services/techStack.service';

export default () => {};

describe('TECH STACK TESTING', () => {
  let techStackFind;
  let techStackCreate;
  let techStackDelete;

  beforeEach(() => {
    techStackFind = sinon.stub(TechStack, 'findOne');
    techStackCreate = sinon.stub(TechStack, 'create');
    techStackDelete = sinon.stub(TechStack, 'deleteOne');
  });

  afterEach(() => {
    techStackFind.restore();
    techStackCreate.restore();
    techStackDelete.restore();
  });

  it('Should return array data', async () => {
    const result = await getTechStacksService();
    expect(result.data).to.be.an('array');
  });

  it('Should return one TechStack', async () => {
    const account = { name: 'Long' };
    techStackFind.resolves(account);
    const result = await getTechStackService();
    expect(techStackFind.calledOnce).to.be.true;
    expect(result.status).to.equal(200);
  });

  it('Should return success when a new tech stack created', async () => {
    const account = { name: 'Long' };
    techStackCreate.resolves(account);
    const result = await createTechStackService(account);
    expect(result.status).to.equal(200);
    expect(result.message).to.equal('Create data successfully');
  });

  it('Should return fail because Tech stack already exits', async () => {
    try {
      const account = { name: 'Long' };
      techStackFind.resolves(account);
      const result = await createTechStackService(account);
    } catch (error) {
      expect(error.message).to.equal('Tech stack already exists');
    }
  });

  it('Should return success when TechStack was deleted', async () => {
    const account = { name: 'Long' };
    techStackFind.resolves(account);
    techStackDelete.resolves(account);
    const result = await deleteTechStackService();
    expect(result.message).to.equal('Delete data successfully');
  });
});
