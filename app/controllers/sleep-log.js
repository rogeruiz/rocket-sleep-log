var bedTime = require('./bed-time');
var wakeTime = require('./wake-time');

module.exports = {
  index: function(request, response) {
    response.send({
      index: true
    });
  },
  show: function(request, response) {
    response.send({
      controller: request.url
    });
  },
  create: function(request, response) {
    response.send({
      controller: request.url
    });
  },
  update: function(request, response) {
    response.send({
      controller: request.url
    });
  }
};
