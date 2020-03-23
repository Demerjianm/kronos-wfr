const AxiosBase = require('./base/AxiosBase');

const { APP_JSON, POST, SEC3_V1_LOGIN } = require('./static');

class Auth extends AxiosBase {
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
    this.activeToken = null;
    this.expiration = 0;
    this.staticHeaders = { Accept: APP_JSON, 'Content-Type': APP_JSON };
  }

  /**
   *
   *
   * @returns
   * @memberof Auth
   */
  async getToken() {
    const curTime = new Date(Date.now());

    if (this.activeToken && curTime < this.expiration) {
      return this.activeToken;
    }

    const options = {
      method: POST,
      url: SEC3_V1_LOGIN,
      headers: {
        ...this.staticHeaders,
        'api-key': this.apikey
      },
      data: JSON.stringify({ credentials: this.credentials })
    };

    try {
      const { token, ttl } = await this.callApi(options);

      this.activeToken = token;
      this.expiration = new Date(Date.now() + ttl);

      return this.activeToken;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

module.exports = Auth;
