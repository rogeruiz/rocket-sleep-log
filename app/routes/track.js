'use strict';

var controller = require('../controllers/track');
var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  // Nothing to see here, so go back to /index
  res.redirect('..');
});

router.get('/:type', function(req, res) {
  var type = req.params.type;
  var times = controller.getInitialTimes();

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

  if (model.error == null) {
    models[model.type].create(model.data).then(function() {
      res.redirect('..');
    });
  } else {
    res.status(500).render('error/500', {
      message: 'Type does not exist',
      error: undefined
    });
  }

});

module.exports = router;
