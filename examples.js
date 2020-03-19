// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import { Kronos } from './kronos';
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const app = express();

const kr = new Kronos({
  username: process.env.WFRUSERNAME,
  password: process.env.WFRPASSWORD,
  apikey: process.env.APIKEY,
  company: process.env.WFRCOMPANY
});

const getEmployees = async () => {
  const res = await kr.getEmployees();
  console.log('the employees', res);
};

app.listen(3005, async () => {
  await getEmployees();
  console.log('hi, im running');
});
