import { expect } from 'chai';
import sinon from 'sinon';
// import axios from 'axios';
import { loginService } from '../services/auth.service';

describe('AUTH TESTING', () => {
  it('Should return success', async () => {
    const account = { email: 'admin01@gmail.com', password: 'admin123' };
    const result = await loginService(account);
    expect(result.status).to.equal(200);
  });

  it('Should return fail because password is wrong', async () => {
    try {
      const account = { email: 'admin01@gmail.com', password: 'admin' };
      const result = await loginService(account);
    } catch (error) {
      expect(error.status).to.equal(404);
      expect(error.message).to.equal('Wrong password');
    }
  });

  it('Should return fail because email not exists', async () => {
    try {
      const account = { email: 'admin@gmail.com' };
      const result = await loginService(account);
    } catch (error) {
      expect(error.message).to.equal('Account not exists');
    }
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
