const express = require("express");
const { getEmployees, getEmployees2 } = require("./kronos");
const app = express();
const port = 3001;

isAsync = async () => {
  getEmployees();
};
// getEmployees();
// setTimeout(() => {
//   getEmployees2();
// }, 5000);
// isAsync();
app.listen(port, async () => {
  await getEmployees();
  console.log(`woo running, ${port}`);
});
