const _ = require('lodash');

const Auth = require('./base/auth');
const EmployeeController = require('./controller/EmployeeController');
const TimeEntryController = require('./controller/TimeEntryController');
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
  }

  /**
   *
   *
   * @param {number} [einId=-1]
   * @param {boolean} [terminated=null]
   * @returns
   * @memberof Kronos
   */
  async getEmployees(einId = -1, terminated = null) {
    const authHeaders = await this.getHeaders();
    if (_.isNull(authHeaders)) {
      return { status: 404, statusText: 'Failed to fetch token', data: {} };
    }

    const employees = new EmployeeController(this.v2);
    const resEmployees = employees.getEmployees(authHeaders, {
      einId,
      terminated
    });

    return resEmployees;
  }

  /**
   *
   *
   * @param {object} employeeObj
   * @memberof Kronos
   */
  async newEmployee(employeeObj) {
    const authHeaders = await this.getHeaders();
    if (_.isNull(authHeaders)) {
      return { status: 404, statusText: 'Failed to fetch token', data: {} };
    }

    const employees = new EmployeeController(this.v2);
    const resEmployees = employees.createEmployee(authHeaders, employeeObj);

    return resEmployees;
  }

  /**
   *
   *
   * @param {array} timeEntries
   * @returns
   * @memberof Kronos
   */
  async newTimeEntries(timeEntries) {
    const authHeaders = await this.getHeaders();
    if (_.isNull(authHeaders)) {
      return { status: 404, statusText: 'Failed to fetch token', data: {} };
    }

    const timeEntry = new TimeEntryController(this.v2);
    const resTimeEntries = timeEntry.putTimeEntries(authHeaders, timeEntries);

    return resTimeEntries;
  }
}

module.exports = Kronos;
