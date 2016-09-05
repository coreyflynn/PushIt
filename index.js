require('dotenv').config();
var winston = require('./config/winston');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var app = express();

// set up passport for authentication
require('./auth/serializers');
require('./auth/google');
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// pull in body parser so we can respond with json when a client posts to our API
var bodyParser = require('body-parser')
app.use( bodyParser.json() );

// use pug to render views
app.set('view engine', 'pug');

// login route
app.get('/', function(req, res) { res.render('login'); });

// protected routes
app.get('/pushit',
  // passport.authenticate('google', { scope: ['profile', 'email'] })),
  function (req, res) {
    if (!req.user) {
      res.redirect('/');
    } else {
      res.render('pushit', { title: 'Pushit', user: req.user });
    }
});

// tracking
app.post('/track', function (req, res) {
  winston.info([req.body.user, req.body.state, 'it!'].join(' '));
  res.send(['You', req.body.state, 'it!'].join(' '));
});

// authentication routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/pushit');
  });

// start the server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('listening on port ' + port);
});
