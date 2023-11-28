const express = require("express");

const api = express.Router();
const { loginRouter } = require("./login/login.router");
const { menuRouter } = require('./menu/menu.router');

api.use("/auth", loginRouter);
api.use("/menu", menuRouter);

module.exports = api;
