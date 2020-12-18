import { expect } from 'chai';
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
});
