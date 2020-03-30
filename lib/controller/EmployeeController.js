const EmployeeModel = require('../model/EmployeeModel');
const Eval = require('../utils/eval');

/**
 *
 *
 * @class EmployeeController
 * @extends {Net}
 */
class EmployeeController {
  /**
   * Creates an instance of EmployeeController.
   * @param {string} urlV2
   * @memberof EmployeeController
   */
  constructor(urlV2) {
    this.url = `${urlV2}/employees`;
  }

  /**
   *
   *
   * @param {object} authHeaders
   * @param {object} { einId, terminated }
   * @returns {object}
   * @memberof EmployeeController
   */
  async getEmployees(authHeaders, { einId, terminated }) {
    const params = {};

    if (einId !== -1) {
      params.ein_id = einId;
    }
    if (terminated !== null) {
      params.terminated = terminated;
    }

    const employee = new EmployeeModel(this.url);

    const res = await employee.get(authHeaders, params);

    return res;
  }

  /**
   *
   *
   * @param {object} authHeaders
   * @param {object} employeeObj
   * @returns {object}
   * @memberof EmployeeController
   */
  async createEmployee(authHeaders, employeeObj) {
    const { code, message } = this.evalEmployeeObj(employeeObj);
    if (code !== 200) {
      return { code, message, data: {} };
    }

    const data = JSON.stringify(employeeObj);
    const headers = { ...authHeaders, 'Content-Length': data.length };

    const employee = new EmployeeModel(this.url);

    const res = await employee.post(headers, employeeObj);

    return res;
  }

  /**
   *
   *
   * @param {object} employeeObj
   * @returns {object}
   * @memberof EmployeeController
   */
  evalEmployeeObj(employeeObj) {
    const { address, dates } = employeeObj;

    if (!Eval.isValidString(employeeObj.username)) {
      return { code: 500, message: 'username is invalid.' };
    }

    if (!Eval.isValidString(employeeObj.first_name)) {
      return { code: 500, message: 'first name is invalid.' };
    }

    if (!Eval.isValidString(employeeObj.last_name)) {
      return { code: 500, message: 'last name is invalid.' };
    }

    if (!Eval.isValidString(employeeObj.employee_id)) {
      return { code: 500, message: 'employee id is invalid.' };
    }

    if (!Eval.isValidString(employeeObj.social_security)) {
      return { code: 500, message: 'social security number is invalid.' };
    }

    if (!Eval.isValidObject(address)) {
      return { code: 500, message: 'address is invalid.' };
    }

    if (!Eval.isValidObject(dates)) {
      return { code: 500, message: 'dates is invalid.' };
    }

    const resAddressObj = this.evalAddressObj(address);
    if (resAddressObj.code !== 200) {
      return resAddressObj;
    }

    const resDateObj = this.evalDateObj(dates);
    if (resDateObj.code !== 200) {
      return resDateObj;
    }

    return { code: 200, message: 'All data in employee object is valid.' };
  }

  /**
   *
   *
   * @param {object} addressObj
   * @returns {boolean}
   * @memberof EmployeeController
   */
  evalAddressObj(addressObj) {
    if (!Eval.isValidString(addressObj.address_line_1)) {
      return { code: 500, message: 'address line 1 is invalid.' };
    }

    if (!Eval.isValidString(addressObj.country)) {
      return { code: 500, message: 'country is invalid.' };
    }

    if (!Eval.isValidString(addressObj.city)) {
      return { code: 500, message: 'city is invalid.' };
    }

    if (!Eval.isValidString(addressObj.state)) {
      return { code: 500, message: 'state is invalid.' };
    }

    if (!Eval.isValidString(addressObj.zip)) {
      return { code: 500, message: 'zip is invalid.' };
    }

    return { code: 200, message: 'All data in address object is valid.' };
  }

  /**
   *
   *
   * @param {object} dateObj
   * @returns {boolean}
   * @memberof EmployeeController
   */
  evalDateObj(dateObj) {
    if (!Eval.isValidDate(dateObj.hired)) {
      return { code: 500, message: 'hired date is invalid.' };
    }

    if (!Eval.isValidDate(dateObj.started)) {
      return { code: 500, message: 'started date is invalid.' };
    }

    if (!Eval.isValidDate(dateObj.birthday)) {
      return { code: 500, message: 'birthday is invalid.' };
    }

    return { code: 200, message: 'All data in address object is valid.' };
  }
}

module.exports = EmployeeController;
