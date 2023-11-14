
const express = require('express');
const {registerUser, loginUser, verifyToken, logoutUser} = require('./login.controller')

const loginRouter = express.Router();


loginRouter.post('/register', registerUser);
loginRouter.post('/login', loginUser);
loginRouter.get('/user', verifyToken, (req, res) => {
  const user = req.user;
  res.status(200).json({ user });
});
loginRouter.post('/logout', logoutUser);


module.exports = {
    loginRouter,
}