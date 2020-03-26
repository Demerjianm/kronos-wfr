// import Kronos from '../kronos';
import utils from './utils';

import '../config';

describe('Testing the kronos class', () => {
  describe('Kronos: ', () => {
    beforeAll(() => {
      utils.setTimeout();
    });

    it('5 + 3 = 8 should return true.', done => {
      const sum = 5 + 3;

      expect(sum).toEqual(8);

      done();
    });

    it('Get token', async done => {
      // const kronos = new Kronos({
      //   username: process.env.WFRUSERNAME,
      //   password: process.env.WFRPASSWORD,
      //   apikey: process.env.APIKEY,
      //   company: process.env.WFRCOMPANY
      // });
      // const res = await kronos.token();

      // console.log('TOKEN: ', res);

      // expect(true).toBeTruthy();

      done();
    });
  });
});
