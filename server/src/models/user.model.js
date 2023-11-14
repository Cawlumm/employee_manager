const usersDatabase = require("./user.mongo");


async function saveUser(user) {
  return await usersDatabase.findOneAndUpdate(
    user,
    {
      upsert: true,
      returnOriginal: false
    }
  );
}

module.exports = {
  saveUser,
};
