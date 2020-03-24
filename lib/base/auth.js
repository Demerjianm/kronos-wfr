const { EventEmitter } = require('events');

const Net = require('./net');
const { APP_JSON, GET, POST, SEC3_V1 } = require('../static');

/**
 *
 *
 * @class Auth
 * @extends {EventEmitter}
 */
class Auth extends EventEmitter {
  /**
   * Creates an instance of Auth.
   * @param {string} username
   * @param {string} password
   * @param {string} apikey
   * @param {string} company
   * @memberof Auth
   */
  constructor(username, password, apikey, company) {
    super();

    this.credentials = { username, password, company };
    this.apikey = apikey;
    this.staticHeaders = { Accept: APP_JSON, 'Content-Type': APP_JSON };

    this.activeToken = null;
    this.expiration = 0;
    this.ttl = 0;
    this.on('token', (token, exp, ttl) => {
      this.activeToken = token;
      this.expiration = exp;
      this.ttl = ttl;
    });
  }

  /**
   *
   *
   * @returns
   * @memberof Auth
   */
  async getHeaders() {
    const token = await this.getToken();

    return {
      ...this.staticHeaders,
      Authentication: `Bearer ${token}`
    };
  }

  /**
   *
   *
   * @returns
   * @memberof Auth
   */
  async getToken() {
    if (this.activeToken) {
      let token;
      const curTime = new Date().getTime();

      const timeToLogin = this.expiration - this.ttl * 0.1;
      const timeToRefresh = this.expiration - this.ttl * 0.25;

      if (curTime >= timeToLogin) {
        // console.log(
        //   `Token >>>>> ${this.activeToken} \nBest before: ${new Date(
        //     timeToLogin
        //   )}`
        // );
        // console.log(
        //   `Current: ${new Date(curTime)} [ ${new Date(timeToLogin)} ]`
        // );
        token = await this.login();
      } else if (curTime < timeToLogin && curTime > timeToRefresh) {
        // console.log(
        //   `Refreshed Token >>>>> ${this.activeToken} \nBest before: ${new Date(
        //     this.expiration
        //   )}`
        // );
        // console.log(`Current: ${new Date(curTime)}`);
        // console.log(
        //   `[ ${new Date(timeToRefresh)} -> ${new Date(timeToLogin)} ]`
        // );
        token = await this.refreshToken();
      } else {
        // console.log(
        //   `Current: ${new Date(curTime)} [ ${new Date(this.expiration)} ]`
        // );
        // console.log(
        //   `[ ${new Date(timeToRefresh)} -> ${new Date(timeToLogin)} ]`
        // );
        token = this.activeToken;
      }

      return token;
    }

    const token = await this.login();

    return token;
  }

  /**
   *
   *
   * @returns
   * @memberof Auth
   */
  async login() {
    const options = {
      method: POST,
      url: `${SEC3_V1}login`,
      headers: {
        ...this.staticHeaders,
        'api-key': this.apikey
      },
      data: JSON.stringify({ credentials: this.credentials })
    };

    const token = await this.callApiForToken(options);

    return token;
  }

  /**
   *
   *
   * @returns
   * @memberof Auth
   */
  async refreshToken() {
    const options = {
      method: GET,
      url: `${SEC3_V1}refresh-token`,
      headers: this.getAuthHeaders()
    };

    const token = await this.callApiForToken(options);

    return token;
  }

  /**
   *
   *
   * @param {object} options
   * @returns
   * @memberof Auth
   */
  async callApiForToken(options) {
    try {
      const net = new Net();
      const { token, ttl } = await net.callApi(options);

      this.emit('token', token, new Date().getTime() + ttl, ttl);

      return this.activeToken;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  /**
   *
   *
   * @returns
   * @memberof Auth
   */
  getAuthHeaders() {
    return {
      ...this.staticHeaders,
      Authentication: `Bearer ${this.activeToken}`
    };
  }
}

module.exports = Auth;
