var moment = require('moment');

module.exports = {
  serializeModel: function(type, payload) {
    var model = {
      type: '',
      data: {}
    };

    var serializedDate, serializedSleepTime, serializedWakeTime;

    serializedDate = moment(payload.date).toDate();

    if (payload.sleepTime) {
      var sleepTime = payload.sleepTime.split(':');
      serializedSleepTime = moment({
        hour: sleepTime[0],
        minutes: sleepTime[1]
      }).toDate();
    }

    if (payload.wakeTime) {
      var wakeTime = payload.wakeTime.split(':');
      serializedWakeTime = moment({
        hour: wakeTime[0],
        minutes: wakeTime[1]
      }).toDate();
    }

    switch (type) {
      case 'bed':
        model.type = 'BedTime';
        model.data = {
          date: serializedDate,
          sleepTime: serializedSleepTime,
          activity: payload.activity,
          activityLevel: payload.activityLevel,
          noiseLevel: payload.noiseLevel,
          lightLevel: payload.lightLevel
        };
        break;
      case 'wake':
        model.type = 'WakeTime';
        model.data = {
          date: serializedDate,
          wakeTime: serializedWakeTime,
          sleepTime: serializedSleepTime,
          wakeAction: payload.wakeAction,
          wakeActivity: payload.wakeActivity,
          sleepActivity: payload.sleepActivity
        };
        break;
      case 'nap':
        model.type = 'NapTime';
        model.data = {
          date: serializedDate,
          sleepTime:  serializedSleepTime,
          wakeTime:  serializedWakeTime,
          activity: payload.activity
        };
        break;
      default:
        model.error = true;
    }

    return model;
  },
  getInitialTimes: function() {
    var times = {};

    times.today = moment().format('YYYY-MM-DD');
    times.sleepTime = moment().format('HH:mm');
    times.wakeTime = moment().add(30, 'minutes').format('HH:mm');

    return times;
  }
};
