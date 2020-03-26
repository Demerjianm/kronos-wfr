const Net = require('./base/net');
const { GET, POST } = require('./static');

/**
 *
 *
 * @class Employees
 * @extends {Net}
 */
class Employees extends Net {
  constructor(urlV2) {
    super();

    this.url = `${urlV2}/employees`;
  }

  /**
   *
   *
   * @param {object} headers
   * @param {object} params
   * @returns
   * @memberof Employees
   */
  async getEmployees(headers, params) {
    const options = {
      headers,
      params,
      method: GET,
      url: this.url
    };

    try {
      const res = await this.callApi(options);

      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  /**
   *
   *
   * @param {object} headers
   * @param {object} employeeObj
   * @returns
   * @memberof Employees
   */
  async postEmployee(headers, employeeObj) {
    const options = {
      headers,
      method: POST,
      url: this.url,
      data: JSON.stringify(employeeObj)
    };

    console.log('Employee options: ', options);

    try {
      const net = new Net();
      const res = await net.callApi(options);

      return res;
    } catch (error) {
      return error;
    }
  }
}

module.exports = Employees;
