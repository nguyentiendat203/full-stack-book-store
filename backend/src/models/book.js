'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsToMany(models.Cart, { through: 'Book_Cart' })
      Book.belongsToMany(models.Order, { through: 'Book_Order' })
      Book.belongsTo(models.Supplier)
      Book.belongsTo(models.Category)
      Book.hasMany(models.Review, { foreignKey: 'bookId' })
    }
  }
  Book.init(
    {
      supplierId: {
        type: DataTypes.INTEGER
      },
      categoryId: {
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.DOUBLE
      },
      discount: DataTypes.INTEGER,
      stock: {
        type: DataTypes.INTEGER
      },
      author: {
        type: DataTypes.STRING
      },
      pageNumber: {
        type: DataTypes.INTEGER
      },
      publishingYear: {
        type: DataTypes.INTEGER
      },
      slug: DataTypes.STRING,
      image: DataTypes.STRING,
      totalRating: DataTypes.INTEGER,
      sold: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      ratingsAverage: {
        type: DataTypes.DOUBLE,
        defaultValue: 3.5
      }
    },
    {
      sequelize,
      modelName: 'Book'
    }
  )
  return Book
}
