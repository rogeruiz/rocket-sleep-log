var moment = require('moment');
var RSVP = require('rsvp');
var debug = require('debug')('track');

var REQUIRED_VALUES = {
  nap: [
    'date',
    'sleepTime'
  ],
  bed: [
    'date',
    'sleepTime'
  ],
  wake: [
    'date',
    'wakeTime',
    'sleepTime'
  ]
};

var ERROR_MESSAGES = {
  date: {
    blank: 'Date cannot be left blank',
    invalid: 'Date is invalid'
  },
  sleepTime: {
    blank: 'Bed Time cannot be left blank',
    invalid: 'Bed Time is invalid'
  },
  wakeTime: {
    blank: 'Wake Time cannot be left blank',
    invalid: 'Wake Time is invalid'
  }
};

module.exports = {
  validateDateTime: function(type, payload) {
    var dataTypes = {
      time: /time/i,
      date: /date/i
    };
    var errors = [];
    var datetime;

    return new RSVP.Promise(function ValidationPromise(resolve, reject) {
      var required = REQUIRED_VALUES[type];

      required.forEach(function(value, index) {
        if (payload[value]) {
          if (dataTypes.time.test(value)) {
            datetime = payload[value].split(':');
            datetime = moment({
              hour: datetime[0],
              minutes: datetime[1]
            });
          } else if (dataTypes.date.test(value)) {
            datetime = moment(payload[value]);
          }
          if (datetime.isValid()) {
            payload[value] = datetime.toDate();
          } else {
            errors.push(ERROR_MESSAGES[value].invalid);
          }
        } else {
          errors.push(ERROR_MESSAGES[value].blank);
        }
      });

      if (errors.length > 0) {
        reject({
          message: 'Something went wrong with your submission.',
          error: new Error(errors)
        });
      } else {
        resolve(payload);
      }

    });
  },
  serializeModel: function(type, payload) {
    var controller = this;

    return new RSVP.Promise(function(resolve, reject) {
      var modelName, modelData;

      controller.validateDateTime(type, payload).then(function(validatedPayload) {
        switch (type) {
          case 'bed':
            modelName = 'BedTime';
            modelData = {
              date: validatedPayload.date,
              sleepTime: validatedPayload.sleepTime,
              activity: validatedPayload.activity,
              activityLevel: validatedPayload.activityLevel,
              noiseLevel: validatedPayload.noiseLevel,
              lightLevel: validatedPayload.lightLevel
            };
            break;
          case 'wake':
            modelName = 'WakeTime';
            modelData = {
              date: validatedPayload.date,
              wakeTime: validatedPayload.wakeTime,
              sleepTime: validatedPayload.sleepTime,
              wakeAction: validatedPayload.wakeAction || '',
              wakeActivity: validatedPayload.wakeActivity || '',
              sleepActivity: validatedPayload.sleepActivity || ''
            };
            break;
          case 'nap':
            modelName = 'NapTime';
            modelData = {
              date: validatedPayload.date,
              sleepTime:  validatedPayload.sleepTime,
              wakeTime:  validatedPayload.wakeTime || '',
              activity: validatedPayload.activity || ''
            };
            break;
          default:
            reject({
              message: 'Type does not exist. Please pass a valid type.',
              error: new Error('Not Found')
            });
        }

        resolve({
          type: modelName,
          model: modelData
        });
      }, function(error) {
        reject(error);
      });

    });
  },
  generateToday: function() {
    var times = {};

    times.today = moment().format('YYYY-MM-DD');
    times.sleepTime = moment().format('HH:mm');
    times.wakeTime = moment().add(30, 'minutes').format('HH:mm');

    return times;
  }
};
