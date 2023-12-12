const Notification = require("../../models/notification.mongo");
const Approval = require("../../models/approval.mongo");
const User = require("../../models/user.mongo");
const { saveNotification } = require("../../models/notification.model");
const { saveApproval } = require("../../models/approval.model");

async function httpSaveApproval(req, res) {
  try {
    const {
      userId,
      approvalId,
      approved,
      processCode,
      title,
      created,
      reason,
      header,
      detail,
    } = req.body;

    // Server-side validation
    if (!userId || !title || !created || !reason || !header || !detail) {
      return res
        .status(400)
        .json({ error: "Bad Request - Missing required fields" });
    }

    // Validate user existence if needed
    // You can check if the user exists in the User model
    const existingUser = await User.findOne({ userId });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new notification
    const newApproval = new Approval({
      userId,
      approvalId,
      approved,
      processCode,
      title,
      created,
      reason,
      header,
      detail,
    });

    console.log(newApproval);

    // Save the notification to the database
    const savedApproval = await saveApproval(newApproval);
    addNotificationOnApprovalCreation(savedApproval);
    res.status(201).json(savedApproval);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function httpGetApprovals(req, res) {
  try {
    const userId = parseInt(req.params.userId);

    // Validate userId
    if (isNaN(userId)) {
      return res
        .status(400)
        .json({ error: "Invalid userId. It must be a number." });
    }

    // Check if the user with the specified userId exists in the database
    const userExists = await Notification.exists({ userId });

    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    // Get all notifications for the specified user
    const approvals = await Approval.find({ userId });

    res.json({ approvals });
  } catch (error) {}
}

async function httpGetApprovalsLength(req, res) {
  try {
    const userId = parseInt(req.params.userId);

    // Validate userId
    if (isNaN(userId)) {
      return res
        .status(400)
        .json({ error: "Invalid userId. It must be a number." });
    }

    const userExists = await Approval.exists({ userId });

    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    // Use countDocuments with a query to get the length for a specific user
    const count = await Approval.countDocuments({ userId });

    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function httpApproveApproval(req, res) {
  try {
    const userId = parseInt(req.params.userId);
    const approvalId = parseInt(req.params.approvalId);
    // Validate userId
    if (isNaN(userId)) {
      return res
        .status(400)
        .json({ error: "Invalid userId. It must be a number." });
    }
    // Validate approvalId
    if (isNaN(approvalId)) {
      return res
        .status(400)
        .json({ error: "Invalid approvalId. It must be a number." });
    }

    const userExists = await Approval.exists({ userId });

    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const approvalExists = await Approval.exists({ approvalId });

    if (!approvalExists) {
      return res.status(404).json({ error: "Approval not found." });
    }

    const approval = await Approval.findOne({ approvalId });
    approval.approved = true;
    addNotificationOnApprovalCreation(approval);
    await Approval.deleteOne({approvalId});
    res.json(approval).status(201)
  } catch (error) {}
}

async function addNotificationOnApprovalCreation(approval) {
  const {
    userId,
    approvalId,
    approved,
    processCode,
    title,
    created,
    reason,
    header,
    detail,
  } = approval;
  try {
    // You can check if the user exists in the User model
    const existingUser = await User.findOne({ userId });
    if (!existingUser) {
      console.error("User not found");
      return;
    }

    // Create a new notification related to the approval
    const newNotification = new Notification({
      approvalId,
      userId,
      approved,
      processCode,
      title,
      created,
      reason,
      header,
      detail,
    });

    // Save the notification to the database
    const savedNotification = await saveNotification(newNotification);

    console.log("Notification added for Approval:", savedNotification);
  } catch (error) {
    console.error("Error adding notification:", error);
  }
}

async function httpSaveNotification(req, res) {
  try {
    const { userId, title, created, reason, header, detail } = req.body;

    // Server-side validation
    if (!userId || !title || !created || !reason || !header || !detail) {
      return res
        .status(400)
        .json({ error: "Bad Request - Missing required fields" });
    }

    // Validate user existence if needed
    // You can check if the user exists in the User model
    const existingUser = await User.findOne({ userId });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new notification
    const newNotification = new Notification({
      userId,
      title,
      created,
      reason,
      header,
      detail,
    });

    console.log(newNotification);

    // Save the notification to the database
    const savedNotification = await saveNotification(newNotification);

    res.status(201).json(savedNotification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function httpGetNotifications(req, res) {
  try {
    const userId = parseInt(req.params.userId);

    // Validate userId
    if (isNaN(userId)) {
      return res
        .status(400)
        .json({ error: "Invalid userId. It must be a number." });
    }

    // Check if the user with the specified userId exists in the database
    const userExists = await Notification.exists({ userId });

    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    // Get all notifications for the specified user
    const notifications = await Notification.find({ userId });

    res.json({ notifications });
  } catch (error) {}
}

async function httpGetNotificationsLength(req, res) {
  try {
    const userId = parseInt(req.params.userId);

    // Validate userId
    if (isNaN(userId)) {
      return res
        .status(400)
        .json({ error: "Invalid userId. It must be a number." });
    }

    const userExists = await Notification.exists({ userId });

    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    // Use countDocuments with a query to get the length for a specific user
    const count = await Notification.countDocuments({ userId });

    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = {
  httpSaveApproval,
  httpGetApprovals,
  httpGetApprovalsLength,
  httpApproveApproval,
  httpSaveNotification,
  httpGetNotificationsLength,
  httpGetNotifications,
};
