// import { expect } from 'chai';
// import sinon from 'sinon';
// import axios from 'axios';
// import {} from '../services/staff.service';

// describe('STAFF TESTING', () => {
//   let axiosGet;
//   let axiosPost;

//   beforeEach(() => {
//     axiosGet = sinon.stub(axios, 'get');
//     axiosPost = sinon.stub(axios, 'post');
//   });

//   afterEach(() => {
//     axiosGet.restore();
//     axiosPost.restore();
//   });

//   it('Should return success', async () => {
//     axiosGet.returns(3);
//     const result = await calculateServices.calculator(1, 2);
//     expect(result.data).to.equal(3);
//   });

//   it('Should return fail because number not a number', async () => {
//     const result = await calculateServices.calculator('abc', 2);
//     expect(result.error).to.equal('numberA must be a number');
//   });

//   it('Should return fail because 3rd api return error', async () => {
//     axiosGet.resolves(NaN);
//     const result = await calculateServices.calculator(1, 2);
//     expect(result.error).to.equal('Invalid agruments');
//   });

//   it('Should divide success', async () => {
//     axiosPost.resolves(5);
//     const result = await calculateServices.divide(10, 2);
//     expect(result.data).to.equal(5);
//   });
// });
