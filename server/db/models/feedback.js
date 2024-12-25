const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      Feedback.belongsTo(models.User, { foreignKey: "user_id", as: "author" }); // Связь с автором
      Feedback.belongsTo(models.Category, { foreignKey: "category_id" });
      Feedback.belongsTo(models.Status, { foreignKey: "status_id" });
      Feedback.belongsToMany(models.User, { through: "Upvote", foreignKey: "feedback_id", as: "upvotedUsers" }); // Связь через Upvote
    }
  }
  Feedback.init(
    {
      title: DataTypes.TEXT,
      description: DataTypes.TEXT,
      category_id: DataTypes.INTEGER,
      status_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Feedback",
    }
  );
  return Feedback;
};
