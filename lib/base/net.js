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
      const { data } = await axios(options);

      return data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

module.exports = Net;
