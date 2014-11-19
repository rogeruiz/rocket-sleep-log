var http = require('http');
var express = require('express');
var fs = require('fs');
// var db = require('');
var routes = require('./router');
var debug = require('debug')('rocket-sleep-log');

var app = module.exports = express();

app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);

routes(app);

if (!module.parent) {
  http.createServer(app).listen(app.get('port'), function() {});
  debug('Express server listening on port ' + app.get('port'));
}
