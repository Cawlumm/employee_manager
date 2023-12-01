const mongoose = require('mongoose');

const approvalSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    title: String,
    created: Date,
    reason: String,
    header: headerSchema,
    detail: detailSchema,
  });


const Approval = mongoose.model('Approval', approvalSchema);

module.exports = Approval;