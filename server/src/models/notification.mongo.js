const mongoose = require('mongoose');

const headerSchema = new mongoose.Schema({
  fiscalYear: Number,
  orderNumber: Number,
  description: String,
  totalAmount: Number,
  requisitionNumber: Number,
  buyerID: String,
  vendor: String,
  deliveryAddress: String,
});

const detailSchema = new mongoose.Schema({
  account: String,
  description: String,
  amount: Number,
});

const notificationSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  approvalId: Number,
  approved: Boolean,
  processCode: String,
  title: String,
  created: Date,
  reason: String,
  header: headerSchema,
  detail: detailSchema,
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
