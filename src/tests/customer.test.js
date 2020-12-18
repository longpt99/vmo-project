import { expect } from 'chai';
import sinon from 'sinon';
import { Customer, Project } from '../models';
import {
  getCustomerService,
  getCustomersService,
  createCustomerService,
  deleteCustomerService,
} from '../services/customer.service';

describe('CUSTOMER TESTING', () => {
  let customerFind;
  let customerCreate;
  let customerFindMany;

  beforeEach(() => {
    customerFind = sinon.stub(Customer, 'findOne');
    customerCreate = sinon.stub(Customer, 'create');
    customerFindMany = sinon.stub(Customer, 'find');
  });

  afterEach(() => {
    customerFind.restore();
    customerCreate.restore();
    customerFindMany.restore();
  });

  it('Should return array data', async () => {
    customerFindMany.resolves([]);
    const result = await getCustomersService();
    expect(result.data).to.be.an('array');
    expect(result.status).to.equal(200);
  });

  it('Should return one customer', async () => {
    const account = { name: 'Long' };
    customerFind.resolves(account);
    const result = await getCustomerService();
    expect(customerFind.calledOnce).to.be.true;
    expect(result.status).to.equal(200);
  });

  it('Should return success when a new customer created', async () => {
    const account = { name: 'Long' };
    customerCreate.resolves(account);
    const result = await createCustomerService(account);
    expect(result.status).to.equal(200);
    expect(result.message).to.equal('Create data successfully');
  });

  it('Should return fail because customer already exits', async () => {
    try {
      const account = { name: 'Long' };
      customerFind.resolves(account);
      const result = await createCustomerService(account);
    } catch (error) {
      expect(error.message).to.equal('Customer already exists');
    }
  });

  it('Should return success when customer was deleted', async () => {
    const account = { name: 'Long' };
    customerFind.resolves(account);
    const result = await deleteCustomerService();
    expect(result.message).to.equal('Delete data successfully');
  });
});
