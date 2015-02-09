module.exports = function(sequelize, DataTypes) {
  var BedTime = sequelize.define('BedTime', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
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
