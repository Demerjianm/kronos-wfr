// import { Kronos } from '../kronos';
import Axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';

import { assert, expect } from 'chai';
// import { Kronos } from '../index.txt';
import utils from './utils';

// const Axios = require('axios');
// const { assert } = require('chai');
// const { Kronos } = require('../index');
// const utils = require('./utils');

// require('../config');
import '../config';

describe('Testing the kronos class', () => {
  let kronos;
  // const mock = new MockAdapter(Axios);

  describe('Kronos: ', () => {
    beforeEach(() => {
      // utils.setTimeout();
      // kronos = new Kronos({
      //   username: process.env.WFRUSERNAME,
      //   password: process.env.WFRPASSWORD,
      //   apikey: process.env.APIKEY,
      //   company: process.env.WFRCOMPANY
      // });
    });

    // it('should return true.', async () => {
    //   const employees = await kronos.getEmployees();

    //   // console.log('Employee: ', employees);

    //   expect(process.env.WFRUSERNAME).toBe('kwatts');
    // });

    it('should return true.', done => {
      const sum = 5 + 3;

      assert.equal(sum, 8);

      done();
    });

    it('should return true. 2', done => {
      // const resLogin = await kronos.login();

      // console.log('Login: ', resLogin);
      // mock
      //   .onPost('https://secure3.saashr.com/ta/rest/v1/login')
      //   .reply(200, data);

      kronos
        .login()
        .then(res => {
          // console.log('Login: ', res);
          // expect(res).toEqual({ data: {} });
          // expect(res).to.be.;
          // assert.equal(res, { data: {} });
        })
        .catch(err => {
          console.error('Error: ', err);
        });

      // expect(Axios.request).toHaveBeenCalledWith({
      //   method: 'POST',
      //   url: 'https://secure3.saashr.com/ta/rest/v1/login'
      // });
      // expect(Axios.request).toHaveBeenCalledTimes(1);
      // expect(consoleErrorSpy).not.toHaveBeenCalled();

      done();
      // expect(process.env.WFRUSERNAME).toBe('kwatts');
    });
  });
});
