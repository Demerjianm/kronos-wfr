const axios = require('axios');

/**
 *
 *
 * @class Net
 */
class Net {
  /**
   *
   *
   * @param {object} options
   * @returns
   * @memberof Net
   */
  async callApi(options) {
    try {
      const { status, statusText, data } = await axios(options);

      return { status, statusText, data };
    } catch (error) {
      const { status, statusText, data } = error.response;

      return { status, statusText, data };
    }
  }
}

module.exports = Net;
