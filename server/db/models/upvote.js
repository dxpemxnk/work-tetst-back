const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Upvote extends Model {
    static associate(models) {
      //    // Связь с пользователем
      Upvote.belongsTo(models.User, { foreignKey: "user_id" });

      // Связь с фидбеком
      Upvote.belongsTo(models.Feedback, { foreignKey: "feedback_id" });
    }
  }
  Upvote.init(
    {
      user_id: DataTypes.INTEGER,
      feedback_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Upvote",
    }
  );
  return Upvote;
};
