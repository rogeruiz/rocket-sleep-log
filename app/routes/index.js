var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  // models.
  res.render('index', {
    title: 'Rocket May\'s Sleep Log',
    message: 'Welcome'
  });
});

module.exports = router;
