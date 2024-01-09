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

const approvalSchema = new mongoose.Schema({
    approvalId: { type: Number, required: true },
    userId: { type: Number, required: true },
    approved: Boolean,
    processCode: String,
    title: String,
    created: {
      type: String, 
      default: () => new Date().toISOString().split('T')[0], // Format to YYYY-MM-DD
    },
    reason: String,
    header: headerSchema,
    detail: detailSchema,
  });


const Approval = mongoose.model('Approval', approvalSchema);

module.exports = Approval;