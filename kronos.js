const axios = require("axios");
require("dotenv").config();
const staticHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json"
};
const company = process.env.WFRCOMPANY;
const key = process.env.APIKEY;
const config = {
  credentials: {
    username: process.env.WFRUSERNAME,
    password: process.env.WFRPASSWORD,
    company
  }
};

let activeToken;

auth = async () => {
  var options = {
    method: "POST",
    url: "https://secure2.saashr.com/ta/rest/v1/login?origin=script",
    headers: {
      ...staticHeaders,
      "api-key": key
    },
    data: JSON.stringify({ ...config })
  };
  try {
    if (activeToken) {
      return activeToken;
    } else {
      const res = await axios(options);
      const {
        data: { token }
      } = res;
      activeToken = token;
      return token;
    }
  } catch (e) {
    console.log(e);
  }
};

handleHeaders = async () => {
  const tk = await auth();
  return {
    headers: {
      Authentication: `bearer ${tk}`,
      ...staticHeaders
    }
  };
};

getEmployees = async () => {
  var options = {
    method: "GET",
    url: `https://secure2.saashr.com/ta/rest/v2/companies/|${company}/employees`,
    ...(await handleHeaders())
  };
  return handleAxios({ options });
};

handleAxios = async ({ options }) => {
  try {
    const res = await axios(options);
    const { data } = res;
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

module.exports = { getEmployees };
