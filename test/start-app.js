var testrunner = require('qunit');

var options = {
  log: {
    assertions: true,
    errors: true,
    tests: true,
    summary: true,
    globalSummary: false,
    coverage: false,
    globalCoverage: false,
    testing: true
  },
  coverage: false,
  deps: null,
  namespace: null,
  maxBlockDuration: 2000
};

// Setup QUnit
testrunner.setup(options);

var app = require('../app/start-app');
var models = require('../app/models');

models.sequelize.sync().then(function() {
  var server = app.listen(app.get('port'), function() {

    testrunner.run({
      code: 'app/routes/index.js',
      tests: 'unit/routes/index.js'
    }, function(error, report) {
      console.log('error', error);
      console.log('report', report);
    });

  });
});
