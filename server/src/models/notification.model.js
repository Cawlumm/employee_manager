const Notification = require("./notification.mongo");

async function saveNotification(notification) {
  try {
    console.log(notification)
    return await Notification.create(notification)
  } catch (err) {
    return err;
  }
}

module.exports = {
  saveNotification,
};
