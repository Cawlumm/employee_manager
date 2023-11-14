const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  userId : {type: Number, unique: true},
  username: { type: String, unique: true, required: true },
  fullName: String,
  email: { type: String, unique: true },
});

// Plugin passport-local-mongoose to simplify handling of username and password
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;

