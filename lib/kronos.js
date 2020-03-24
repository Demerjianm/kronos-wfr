// const axios = require('axios');

const Auth = require('./base/auth');
const Employees = require('./employees');
const { SEC3_V2_COMPANIES } = require('./static');

class Kronos extends Auth {
  /**
   * Creates an instance of Kronos.
   * @param {*} { username, password, apikey, company }
   * @memberof Kronos
   */
  constructor({ username, password, apikey, company }) {
    super(username, password, apikey, company);
    this.v2 = SEC3_V2_COMPANIES + company;

    this.credentials = { username, password, company };
    this.apikey = apikey;
    this.activeToken = null;
    this.staticHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
  }

  /**
   * @description - creates the headers for api requests
   */
  // async handleHeaders() {
  //   const token = await this.auth();
  //   return {
  //     headers: {
  //       Authentication: `Bearer ${token}`,
  //       ...this.staticHeaders
  //     }
  //   };
  // }

  /**
   *
   * @param {object} options - the options axios needs to make a requests
   *  - method, url, headers, data
   */
  // async handleAxios({ options }) {
  //   try {
  //     const res = await axios(options);
  //     const { data } = res;
  //     return data;
  //   } catch (e) {
  //     console.error(e);
  //     return e;
  //   }
  // }

  /**
   * @description handles getting the auth token for making following requests
   *  if a token is already in the model just returns that instead of requery
   */
  // async auth() {
  //   const options = {
  //     method: 'POST',
  //     url: 'https://secure3.saashr.com/ta/rest/v1/login',
  //     headers: {
  //       ...this.staticHeaders,
  //       'api-key': this.apikey
  //     },
  //     data: JSON.stringify({
  //       credentials: { ...this.credentials }
  //     })
  //   };
  //   // if token exist just return
  //   if (this.activeToken) {
  //     return this.activeToken;
  //   }
  //   try {
  //     const res = await axios(options);
  //     const {
  //       data: { token }
  //     } = res;
  //     this.activeToken = token;
  //     return token;
  //   } catch (e) {
  //     console.error(e);
  //     return e;
  //   }
  // }

  /**
   * @description fetches employees from a specific company
   */
  // async getEmployees() {
  //   const options = {
  //     method: 'GET',
  //     url: `${this.v2}/employees`,
  //     ...(await this.handleHeaders())
  //   };

  //   return this.handleAxios({ options });
  // }

  /**
   *
   *
   * @returns
   * @memberof Kronos
   */
  async token() {
    try {
      const res = await this.getToken();
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  /**
   *
   *
   * @returns
   * @memberof Kronos
   */
  async getEmployeesV2() {
    const employees = new Employees();
    const resEmployees = employees.getEmployees(
      this.v2,
      await this.getHeaders()
    );

    return resEmployees;
  }
}

module.exports = Kronos;
