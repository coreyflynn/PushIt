var winston = require('winston');
var express = require('express');
var passport = require('passport');
var app = express();

// set up passport for authentication
require('./auth/google');
app.use(passport.initialize());

// pull in body parser so we can respond with json when a client posts to our API
var bodyParser = require('body-parser')
app.use( bodyParser.json() );

// use pug to render views
app.set('view engine', 'pug');

// login route
app.get('/', function(req, res) { res.render('login'); });

// protected routes
app.get('/pushit', function (req, res) { res.render('pushit', { title: 'Pushit'}); });

// tracking
app.post('/track', function (req, res) {
  winston.info('Somebody Pushed It!', req.body);
  res.send('You Pushed It!');
});

// authentication routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// start the server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  winston.info('PushIt is listening on port ' + port);
});
