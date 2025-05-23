'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Book, { foreignKey: 'categoryId' })
      Category.belongsTo(models.ListCate, { foreignKey: 'listCateId' })
    }
  }
  Category.init(
    {
      listCateId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Category'
    }
  )
  return Category
}
