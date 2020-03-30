const Net = require('../base/net');
const { GET, POST } = require('../static');

/**
 *
 *
 * @class EmployeeModel
 * @extends {Net}
 */
class EmployeeModel extends Net {
  /**
   * Creates an instance of EmployeeModel.
   * @param {string} url
   * @memberof EmployeeModel
   */
  constructor(url) {
    super();

    this.url = url;
  }

  /**
   *
   *
   * @param {object} headers
   * @param {object} params
   * @returns {object} res - {}
   * @memberof EmployeeModel
   */
  async get(headers, params) {
    const options = { headers, params, url: this.url, method: GET };

    try {
      const res = await this.callApi(options);

      return res;
    } catch (error) {
      return error;
    }
  }

  /**
   *
   *
   * @param {object} headers
   * @param {object} employeeObj
   * @returns {object} res - {}
   * @memberof EmployeeModel
   */
  async post(headers, employeeObj) {
    const options = {
      headers,
      url: this.url,
      method: POST,
      data: JSON.stringify(employeeObj)
    };

    try {
      const res = await this.callApi(options);

      return res;
    } catch (error) {
      return error;
    }
  }

  // get() {
  //   const model = {
  //     username: 'TJones', // required, unique.
  //     first_name: 'Tony', // required.
  //     last_name: 'Jones', // required.
  //     photo_href: '',
  //     middle_name: '',
  //     employee_id: 'b113', // required, unique.
  //     address: {
  //       address_line_1: '1092 E Main St',
  //       country: 'USA', // required.
  //       city: 'Tustin', // required.
  //       state: 'CA', // required.
  //       zip: '92780'
  //     },
  //     use_separate_mailing_address: false,
  //     status: 'string',
  //     ein: {
  //       id: 34357504
  //     },
  //     force_change_password: false,
  //     locked: true,
  //     phones: {
  //       cell_phone: '+333333333',
  //       home_phone: '+333333333',
  //       work_phone: '+333333333',
  //       preferred_phone: 'WORK'
  //     },
  //     mailing_address: {
  //       address_line_1: '1092 E Main St',
  //       country: 'USA',
  //       city: 'Tustin',
  //       state: 'CA',
  //       zip: '92780'
  //     },
  //     nickname: 'string',
  //     salutation: 'string',
  //     social_security: '821-54-7867', // required, unique.
  //     suffix: 'string',
  //     timezone: 'America/New_York',
  //     add_to_new_hire_export: true,
  //     dates: {
  //       hired: '2018-11-01', // required.
  //       deceased: '2018-11-01',
  //       re_hired: '2013-05-22',
  //       started: '2002-11-05', // required.
  //       birthday: '2002-06-24', // required.
  //       review: '2016-02-20',
  //       seniority: '2019-08-19',
  //       frozen_benefit: '2018-02-04',
  //       benefits: '2002-11-16',
  //       retired: '2000-09-14',
  //       terminated: '2015-08-24',
  //       peo_hired: '2015-06-18',
  //       custom_dates: [
  //         {
  //           index: 2,
  //           date: '2000-04-21'
  //         }
  //       ]
  //     },
  //     managed_cost_centers_enabled: true,
  //     managed_cost_centers_settings: {
  //       allow_save_others_cost_centers: false
  //     },
  //     primary_email: 'abc@email.com', // validation.
  //     secondary_email: 'def@email.com', // validation.
  //     _links: {
  //       self: 'https://example.com/ta/rest/v2/companies/453313/employees/10',
  //       demographics:
  //         'https://example.com/ta/rest/v2/companies/453313/employees/10/demographics',
  //       'pay-info':
  //         'https://example.com/ta/rest/v2/companies/453313/employees/10/pay-info',
  //       badges:
  //         'https://example.com/ta/rest/v2/companies/453313/employees/10/badges',
  //       profiles:
  //         'https://example.com/ta/rest/v2/companies/453313/employees/10/profiles',
  //       'hcm-profiles':
  //         'https://example.com/ta/rest/v2/companies/453313/employees/10/hcm-profiles',
  //       'hcm-fields':
  //         'https://example.com/ta/rest/v2/companies/453313/employees/10/hcm-fields'
  //     }
  //   };
  // }
}

module.exports = EmployeeModel;
