const _ = require('lodash');
const moment = require('moment');

/**
 *
 *
 * @class Eval
 */
class Eval {
  /**
   *
   *
   * @static
   * @param {string} str
   * @returns {boolean}
   * @memberof Eval
   */
  static isValidString(str) {
    return (
      _.isString(str) &&
      str.length !== 0 &&
      str.trim() &&
      !_.isNil(str) &&
      !_.isUndefined(str)
    );
  }

  /**
   *
   *
   * @static
   * @param {object} obj
   * @returns {boolean}
   * @memberof Eval
   */
  static isValidObject(obj) {
    return (
      _.isObject(obj) && !_.isEmpty(obj) && !_.isNil(obj) && !_.isUndefined(obj)
    );
  }

  /**
   *
   *
   * @static
   * @param {string} date
   * @returns {boolean}
   * @memberof Eval
   */
  static isValidDate(date) {
    return (
      _.isString(date) &&
      date.length !== 0 &&
      date.trim() &&
      !_.isNil(date) &&
      !_.isUndefined(date) &&
      moment(date, 'YYYY-MM-DD', true).isValid()
    );
  }
}

module.exports = Eval;
