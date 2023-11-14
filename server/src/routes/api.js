const express = require("express");

const api = express.Router();
const { loginRouter } = require("./login/login.router");

api.use("/auth", loginRouter);

module.exports = api;
