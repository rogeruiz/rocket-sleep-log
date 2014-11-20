'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  // Nothing to see here, so go back to /index
  res.redirect('..');
});

router.get('/:start/:end', function(req, res) {
  // Get :start and :end data from DB
  res.render('chart', {
    title: 'Chart ' + req.params.start + ' to ' + req.params.end,
    message: 'Let\'s chart from ' + req.params.start + ' to ' + req.params.end
  });
});

module.exports = router;
