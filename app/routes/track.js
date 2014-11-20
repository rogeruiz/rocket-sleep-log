'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  // Nothing to see here, so go back to /index
  res.redirect('..');
});

router.get('/:type', function(req, res) {
  // Render track :type
  res.render('track', {
    title: 'Track ' + req.params.type + 'time',
    message: 'It\'s ' + req.params.type + 'time, let\'s track it.'
  });
});

router.post('/:type', function(req, res) {
  // Save :type data to DB
  // Then, go back to /index
  res.redirect('..');
});

module.exports = router;
