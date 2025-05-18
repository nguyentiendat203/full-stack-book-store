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
      Book.belongsToMany(models.Cart, { through: 'Book_Cart', foreignKey: 'bookId', otherKey: 'cartId' })
      Book.belongsToMany(models.Order, { through: 'Book_Order', foreignKey: 'bookId', otherKey: 'orderId' })
      Book.belongsTo(models.Supplier, { foreignKey: 'supplierId' })
      Book.belongsTo(models.Category, { foreignKey: 'categoryId' })
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
        type: DataTypes.DECIMAL(10, 2)
      },
      discount: DataTypes.INTEGER,
      discountedPrice: DataTypes.DECIMAL(10, 2),
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
        type: DataTypes.DECIMAL(10, 2),
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
