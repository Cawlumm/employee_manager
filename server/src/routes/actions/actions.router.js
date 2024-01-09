const express = require("express");

const { httpAddEmployee, httpGetEmployees } = require("./actions.controller");

const actionsRouter = express.Router();

actionsRouter.post("/employee", httpAddEmployee);
actionsRouter.get("/employee", httpGetEmployees);

module.exports = {
  actionsRouter,
};
