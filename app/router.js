var sleepLog = require('./controllers/sleep-log');

module.exports = function(app) {
  app.get('/', sleepLog.index);
  app.get('/time/:type', sleepLog.show);
  app.post('/time/:type', sleepLog.create);
  app.put('/time/:type', sleepLog.update);
};
