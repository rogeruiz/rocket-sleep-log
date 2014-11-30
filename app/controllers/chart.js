var moment = require('moment');

module.exports = {
  serializeNaps: function(naps) {
    var data = [];

    // Convert Dates and Times with Moment.
    naps.forEach(function(nap, idx) {
      var originalSleepTime = nap.dataValues.sleepTime;
      var originalWakeTime = nap.dataValues.wakeTime;
      data.push({
        date: moment(nap.dataValues.date).format('MMMM Do YYYY'),
        sleepTime: moment(nap.dataValues.sleepTime).format('h:mm a'),
        wakeTime: moment(nap.dataValues.wakeTime).format('h:mm a'),
        duration: moment(originalWakeTime).diff(moment(originalSleepTime), 'minutes'),
        activity: nap.dataValues.activity
      });
    });
    return data;
  }
};
