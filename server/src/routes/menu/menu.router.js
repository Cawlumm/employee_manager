const express = require("express");
const {
  httpSaveNotification,
  httpGetNotificationsLength,
  httpGetNotifications,
} = require("./menu.controller");

const menuRouter = express.Router();

menuRouter.post("/notifications", httpSaveNotification);
menuRouter.get("/notifications/:userId", httpGetNotifications);
menuRouter.get("/notifications/length/:userId", httpGetNotificationsLength);

module.exports = {
  menuRouter,
};
