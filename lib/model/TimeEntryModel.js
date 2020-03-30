const Net = require('../base/net');
const { PUT } = require('../static');

/**
 *
 *
 * @class TimeEntryModel
 * @extends {Net}
 */
class TimeEntryModel extends Net {
  /**
   * Creates an instance of TimeEntryModel.
   * @param {string} url
   * @memberof TimeEntryModel
   */
  constructor(url) {
    super();
    this.url = url;
  }

  /**
   *
   *
   * @param {object} headers
   * @param {object} timeEntries
   * @returns
   * @memberof TimeEntryModel
   */
  async put(headers, timeEntrySets) {
    const options = {
      headers,
      url: `${this.url}/collection`,
      method: PUT,
      data: timeEntrySets
    };

    try {
      const res = await this.callApi(options);

      return res;
    } catch (error) {
      return error;
    }
  }
}

module.exports = TimeEntryModel;
