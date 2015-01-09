'use strict';

var controller = require('../controllers/track');
var models = require('../models');
var express = require('express');
var router = express.Router();
var debug = require('debug')('routes:track');

router.get('/', function(req, res) {
  // Nothing to see here, so go back to /index
  res.redirect('..');
});

router.get('/:type', function(req, res) {
  var type = req.params.type;
  var times = controller.generateToday();

  res.render('track/' + type, {
    title: 'Track ' + type + 'time',
    message: 'It\'s ' + type + 'time, let\'s track it.',
    times: times
  });
});

router.post('/:type', function(req, res) {
  // Save :type data to DB
  var type = req.params.type;
  var model = controller.serializeModel(type, req.body);

  model.then(function(data) {
    models[data.type].create(data.model).then(function() {
      res.redirect('..');
    });
  }, function(error) {
    debug(error);
    if (!error) {
      error = {
        message: 'Nothing was rejected',
        error: 'plain'
      };
    }
    res.status(500).render('error/500', error);
  });
});

module.exports = router;
