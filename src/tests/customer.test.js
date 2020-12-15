import { expect } from 'chai';
import sinon from 'sinon';
import { Customer } from '../models';
import {
  getCustomerService,
  getCustomersService,
  createCustomerService,
  deleteCustomerService,
} from '../services/customer.service';

export default () => {};

describe('CUSTOMER TESTING', () => {
  let customerFind;
  let customerCreate;
  let customerDelete;

  beforeEach(() => {
    customerFind = sinon.stub(Customer, 'findOne');
    customerCreate = sinon.stub(Customer, 'create');
    customerDelete = sinon.stub(Customer, 'deleteOne');
  });

  afterEach(() => {
    customerFind.restore();
    customerCreate.restore();
    customerDelete.restore();
  });

  it('Should return array data', async () => {
    const result = await getCustomersService();
    expect(result.data).to.be.an('array');
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
      expect(result.error).to.equal('numberA must be a number');
    } catch (error) {
      expect(error.message).to.equal('Customer already exists');
    }
  });

  it('Should return success when customer was deleted', async () => {
    const account = { name: 'Long' };
    customerFind.resolves(account);
    customerDelete.resolves(account);
    const result = await deleteCustomerService(account);
    expect(result.message).to.equal('Delete data successfully');
  });
});
