const _ = require('lodash');

const TimeEntryModel = require('../model/TimeEntryModel');

/**
 *
 *
 * @class TimeEntryController
 */
class TimeEntryController {
  /**
   * Creates an instance of TimeEntryController.
   * @param {object} { username, password, apikey, company }
   * @param {string} urlV2
   * @memberof TimeEntryController
   */
  constructor(urlV2) {
    this.url = `${urlV2}/time-entries`;
  }

  /**
   *
   *
   * @param {object} authHeaders
   * @param {array} timeEntries
   * @returns {object}
   * @memberof TimeEntryController
   */
  async putTimeEntries(authHeaders, timeEntries) {
    const { code, message } = this.evalTimeEntries(timeEntries);
    if (code !== 200) {
      return { code, message, data: {} };
    }

    const data = JSON.stringify({ time_entry_sets: timeEntries });
    const headers = { ...authHeaders, 'Content-Length': data.length };

    const timeEntry = new TimeEntryModel(this.url);

    const res = await timeEntry.put(headers, data);

    return res;
  }

  /**
   *
   *
   * @param {array} timeEntries
   * @returns {object}
   * @memberof TimeEntryController
   */
  evalTimeEntries(timeEntries) {
    if (!_.isArray(timeEntries)) {
      return { code: 500, message: 'Time entries is invalid.' };
    }

    return { static: 200, statusText: 'Options', data: timeEntries };
  }
}

module.exports = TimeEntryController;
