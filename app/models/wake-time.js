'use strict';

module.exports = function(sequelize, DataTypes) {
  var WakeTime = sequelize.define('WakeTime', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
    },
    wakeTime: DataTypes.DATE,
    sleepTime: DataTypes.DATE,
    // How baby woke up
    wakeAction: DataTypes.TEXT,
    // What baby did
    wakeActivity: DataTypes.TEXT,
    // How baby fell back asleep
    sleepActivity: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        WakeTime.belongsTo(models.BedTime);
      }
    }
  });

  return WakeTime;
};
