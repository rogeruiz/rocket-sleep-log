var moment = require('moment');

module.exports = {
  serializeNaps: function(naps) {
    var data = [];
    var singleNap,
        originalDate,
        originalSleepTime,
        originalWakeTime;

    // Convert Dates and Times with Moment.
    naps.forEach(function(nap, idx) {
      originalDate = moment(nap.dataValues.date);
      originalSleepTime = moment(nap.dataValues.sleepTime);
      originalWakeTime = moment(nap.dataValues.wakeTime);

      singleNap = {
        date: originalDate.format('MM/DD/YYYY'),
        sleepTime: originalSleepTime.format('h:mm a'),
        wakeTime: originalWakeTime.format('h:mm a'),
        duration: originalWakeTime.diff(originalSleepTime, 'minutes'),
        activity: nap.dataValues.activity
      };

      if (singleNap.duration > 60) {
        singleNap.duration = originalWakeTime.diff(originalSleepTime, 'hours', true);
        singleNap.duration += ' hours';
      } else {
        singleNap.duration += ' minutes';
      }

      data[idx] = singleNap;
    });

    return data;
  }
};
