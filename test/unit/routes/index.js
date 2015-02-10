var app = require('../../../app/start-app');
var request = require('supertest');

QUnit.module('Index Route');

QUnit.test('response exists', function(assert) {
  expect(1);
  stop();
  request(app).get('/').end(function(err, res) {
    assert.equal(res.statusCode, '200', 'status code is correct');
    start();
  });
});
