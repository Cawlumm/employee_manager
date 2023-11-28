const Notification = require("../../models/notification.mongo");
const User = require("../../models/user.mongo");
const { saveNotification } = require("../../models/notification.model");

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
    const notificationCount = await Notification.countDocuments({ userId });

    res.json({ notificationCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = {
  httpSaveNotification,
  httpGetNotificationsLength,
  httpGetNotifications,
};
