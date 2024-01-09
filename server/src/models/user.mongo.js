const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  userId : {type: Number, unique: true},
  username: { type: String, unique: true, required: true },
  fullName: { type: String },
  email: { type: String, unique: true },
  created: {
    type: String, 
    default: () => new Date().toISOString().split('T')[0], // Format to YYYY-MM-DD
  },
  lastLoggedIn: {
    type: String, 
    default: () => new Date().toLocaleString(), // Format to YYYY-MM-DD hh:mm:ss
  },
  favoriteLinks: [{ 
    pathName: { type: String, required: true },
    path: { type: String, required: true },
  }], // Stores recent paths/urls visited
});

// Plugin passport-local-mongoose to simplify handling of username and password
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;

