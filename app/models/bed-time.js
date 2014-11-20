'use strict';

module.exports = function(sequelize, DataTypes) {
  var BedTime = sequelize.define('BedTime', {
    sleepTime: DataTypes.DATE,
    // What baby did
    activity: DataTypes.TEXT,
    activityLevel: DataTypes.STRING,
    noiseLevel: DataTypes.STRING,
    lightLevel: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        BedTime.hasMany(models.WakeTime);
      }
    }
  });

  return BedTime;
};
