const Approval = require('./approval.mongo');

async function saveApproval(approval) {
  try {
    console.log(approval)
    return await Approval.create(approval)
  } catch (err) {
    return err;
  }
}

module.exports = {
    saveApproval,
};
