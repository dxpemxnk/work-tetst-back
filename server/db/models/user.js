const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Feedback, { foreignKey: "user_id", as: "authoredFeedbacks" }); // Связь с созданными фидбеками
      User.belongsToMany(models.Feedback, { through: "Upvote", foreignKey: "user_id", as: "upvotedFeedbacks" }); // Связь через Upvote
    }
  }
  User.init(
    {
      email: DataTypes.TEXT,
      password: DataTypes.TEXT,
      avatar: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};