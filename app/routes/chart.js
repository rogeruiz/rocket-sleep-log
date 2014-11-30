'use strict';

var controller = require('../controllers/chart');
var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  // Show all data. This could take a long time once the data gets really
  // really big. Maybe we should paginate?
  models.NapTime.findAll().then(function(naps) {
    res.render('chart/index', {
      data: controller.serializeNaps(naps)
    });
  });
});

router.get('/:start/:end', function(req, res) {
  // Get :start and :end data from DB
  res.render('chart/data', {
    title: 'Chart ' + req.params.start + ' to ' + req.params.end,
    message: 'Let\'s chart from ' + req.params.start + ' to ' + req.params.end
  });
});

router.get('/:start', function(req, res) {
  // Get :start from DB, :end in this case is the latest date
  res.render('chart/data', {
    title: 'Chart ' + req.params.start + ' to latest data',
    message: 'Let\'s chart from ' + req.params.start + ' to latest data'
  });
});

module.exports = router;
