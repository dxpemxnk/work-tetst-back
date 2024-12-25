const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Feedback, { foreignKey: "category_id" });
    }
  }
  Category.init({
    title: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};