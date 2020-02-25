import express from 'express';
// import Kronos from './kronos';

const app = express();
const port = 3001;
// const api = new Kronos({
//   username: process.env.WFRUSERNAME,
//   password: process.env.WFRPASSWORD,
//   apikey: process.env.APIKEY,
//   company: process.env.WFRCOMPANY
// });

app.listen(port, async () => {
  console.log(`woo running, ${port}`);
});
