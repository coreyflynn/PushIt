var winston = require('winston');
var express = require('express');
var app = express();


// pull in body parser so we can respond with json when a client posts to our API
var bodyParser = require('body-parser')
app.use( bodyParser.json() );

// use pug to render views
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.post('/track', function (req, res) {
  winston.info('Somebody Pushed It!', req.body);
  res.send('You Pushed It!');
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  winston.info('PushIt is listening on port ' + port);
});
