const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      Status.hasMany(models.Feedback, { foreignKey: "status_id" });
    }
  }
  Status.init({
    title: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};