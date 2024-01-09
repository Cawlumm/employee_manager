const express = require("express");
const {
  httpSaveNotification,
  httpGetNotificationsLength,
  httpGetNotifications,
  httpSaveApproval,
  httpGetApprovals,
  httpGetApprovalsLength,
  httpApproveApproval,
  httpSaveFavoriteLink,
  httpGetSavedFavoriteLinks,
  httpSaveOptions,
  httpGetOptions,
} = require("./menu.controller");

const menuRouter = express.Router();

menuRouter.post("/notifications", httpSaveNotification);
menuRouter.get("/notifications/:userId", httpGetNotifications);
menuRouter.get("/notifications/length/:userId", httpGetNotificationsLength);

menuRouter.post("/approvals", httpSaveApproval);
menuRouter.get("/approvals/:userId", httpGetApprovals);
menuRouter.post("/approvals/approve/:userId/:approvalId", httpApproveApproval);
menuRouter.get("/approvals/length/:userId", httpGetApprovalsLength);

menuRouter.get("/favorite-links/:userId", httpGetSavedFavoriteLinks);
menuRouter.post("/favorite-links", httpSaveFavoriteLink);

menuRouter.post('/save-options', httpSaveOptions);
menuRouter.get('/get-options', httpGetOptions);

module.exports = {
  menuRouter,
};
