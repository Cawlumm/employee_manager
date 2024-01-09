const express = require("express");

const api = express.Router();
const { loginRouter } = require("./login/login.router");
const { menuRouter } = require("./menu/menu.router");
const { actionsRouter } = require("./actions/actions.router");

api.use("/auth", loginRouter);
api.use("/menu", menuRouter);
api.use("/actions", actionsRouter);

module.exports = api;
