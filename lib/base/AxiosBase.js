const axios = require('axios');

/**
 *
 *
 * @class AxiosBase
 */
class AxiosBase {
  /**
   *
   *
   * @param {object} options
   * @returns
   * @memberof AxiosBase
   */
  async callApi(options) {
    try {
      const { data } = await axios(options);
      console.log('Login >>>> ', data);

      return data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

module.exports = AxiosBase;
