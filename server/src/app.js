/*==================================== IMPORTS =========================================*/

const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const api = require('./routes/api');
const LocalStrategy = require('passport-local').Strategy; 
const User = require('./models/user.mongo')
const app = express();

/*==================================== MIDDLEWARE =========================================*/

app.use(cors({
    origin: 'http://3.141.14.220/:8000',
    credentials: true
}));
app.use(express.json());
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cookieParser());
app.use(session({ secret: 'secretkey', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 
passport.use(new LocalStrategy(User.authenticate())); 

/*==================================== ROUTES =========================================*/

app.use('/v1', api);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})


/*==================================== EXPORT =========================================*/

module.exports = app;