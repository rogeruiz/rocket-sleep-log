'use strict';

var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('rocket-sleep-log');

// Routes
var routes = require('./routes/index');
var track = require('./routes/track');
var chart = require('./routes/chart');

var app = express();
var hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'application',
  partialsDir: 'app/views/partials',
  layoutsDir: 'app/views/layouts'
});

// Setup view engine
app.engine('.hbs', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// Setup some conventional Express things
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// Setup port
app.set('port', process.env.PORT || 3000);

// Setup /public as static resource
app.use(express.static(path.join(__dirname, '../public')));

// Setup routes
app.use('/', routes);
app.use('/track', track);
app.use('/chart', chart);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler; everything is exposed.
if (app.get('env') === 'development') {
  app.disable('view cache');
  app.use(function(err, req, res, next) {
    var status = err.status || 500;
    res.status(status);
    res.render('error/' + status, {
      message: err.message,
      error: err
    });
  });
}

// Production error handler; keep it classy.
app.use(function(err, req, res, next) {
  var status = err.status || 500;
  res.status(status);
  res.render('error/' + status, {
    message: err.message,
    error: {}
  });
});

module.exports = app;
