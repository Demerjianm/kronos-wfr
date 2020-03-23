const axios = require('axios');

class Kronos {
  constructor({ username, password, apikey, company }) {
    this.credentials = { username, password, company };
    this.apikey = apikey;
    this.activeToken = null;
    this.staticHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    this.v2 = `https://secure2.saashr.com/ta/rest/v2/companies/${company}`;
  }

  /**
   * @description - creates the headers for api requests
   */
  async handleHeaders() {
    const token = await this.auth();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        ...this.staticHeaders
      }
    };
  }

  /**
   *
   * @param {object} options - the options axios needs to make a requests
   *  - method, url, headers, data
   */
  async handleAxios({ options }) {
    try {
      const res = await axios(options);
      const { data } = res;
      return data;
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  /**
   * @description handles getting the auth token for making following requests
   *  if a token is already in the model just returns that instead of requery
   */
  async auth() {
    const options = {
      method: 'POST',
      url: 'https://secure2.saashr.com/ta/rest/v1/login?origin=script',
      headers: {
        ...this.staticHeaders,
        'api-key': this.apikey
      },
      data: JSON.stringify({
        credentials: { ...this.credentials }
      })
    };
    // if token exist just return
    if (this.activeToken) {
      return this.activeToken;
    }
    try {
      const res = await axios(options);
      // const res = await axios.post(
      //   'https://secure3.saashr.com/ta/rest/v1/login',
      //   JSON.stringify({ credentials: this.credentials }),
      //   {
      //     headers: {
      //       'content-type': 'application/json',
      //       'api-key': this.apikey
      //     }
      //   }
      // );
      const {
        data: { token }
      } = res;
      this.activeToken = token;
      return token;
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  /**
   *
   *
   * @returns
   * @memberof Kronos
   */
  async login() {
    // -------------------------
    try {
      const res = await axios.post(
        'https://secure3.saashr.com/ta/rest/v1/login',
        JSON.stringify({ credentials: this.credentials }),
        {
          headers: {
            'content-type': 'application/json',
            'api-key': this.apikey
          }
        }
      );
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  /**
   * @description fetches employees from a specific company
   */
  async getEmployees() {
    const options = {
      method: 'GET',
      url: `${this.v2}/employees`,
      ...(await this.handleHeaders())
    };
    console.log('Options: ', options);

    return this.handleAxios({ options });
  }
}

// module.exports = { Kronos };
module.exports = Kronos;

module.exports.default = Kronos;
