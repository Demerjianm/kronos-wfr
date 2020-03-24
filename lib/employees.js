const Net = require('./base/net');
const { GET, POST } = require('./static');

/**
 *
 *
 * @class Employees
 * @extends {Net}
 */
class Employees extends Net {
  /**
   *
   *
   * @param {string} urlV2
   * @param {object} headers
   * @returns
   * @memberof Employees
   */
  async getEmployees(urlV2, headers) {
    const options = {
      headers,
      method: GET,
      url: `${urlV2}/employees`
    };

    try {
      const res = await this.callApi(options);

      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

module.exports = Employees;
