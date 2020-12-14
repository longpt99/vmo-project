import { expect } from 'chai';
import sinon from 'sinon';
// import axios from 'axios';
import { loginService, refreshTokenService } from '../services/auth.service';
import { Account } from '../models';

describe('AUTH TESTING', () => {
  // let axiosGet;
  let accountFindOne;

  beforeEach(() => {
    accountFindOne = sinon.stub(Account, 'findOne');
    // axiosPost = sinon.stub(Account, 'post');
  });

  afterEach(() => {
    // axiosGet.restore();
    accountFindOne.restore();
  });

  it('Should return success', async () => {
    const account = { email: 'admin01@gmail.com', password: 'admin123' };
    const result = await loginService(account);
    expect(result.status).to.equal(200);
  });

  // it('Should return fail because number not a number', async () => {
  //   const result = await calculateServices.calculator('abc', 2);
  //   expect(result.error).to.equal('numberA must be a number');
  // });

  // it('Should return fail because 3rd api return error', async () => {
  //   axiosGet.resolves(NaN);
  //   const result = await calculateServices.calculator(1, 2);
  //   expect(result.error).to.equal('Invalid agruments');
  // });

  // it('Should divide success', async () => {
  //   axiosPost.resolves(5);
  //   const result = await calculateServices.divide(10, 2);
  //   expect(result.data).to.equal(5);
  // });
});
