'use strict';

module.exports = function(sequelize, DataTypes) {
  var NapTime = sequelize.define('NapTime', {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sleepTime: DataTypes.DATE,
    wakeTime: DataTypes.DATE,
    activity: DataTypes.TEXT
  });

  return NapTime;
};
