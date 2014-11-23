'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  // Nothing to see here, so go back to /index
  res.redirect('..');
});

router.get('/:type', function(req, res) {
  var type = req.params.type;

  res.render('track/' + type, {
    title: 'Track ' + type + 'time',
    message: 'It\'s ' + type + 'time, let\'s track it.'
  });
});

router.post('/:type', function(req, res) {
  // Save :type data to DB
  // Then, go back to /index
  console.log(req.body);
  res.redirect('..');
});

module.exports = router;
