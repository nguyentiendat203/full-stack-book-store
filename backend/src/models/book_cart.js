'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Book_Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book_Cart.belongsTo(models.Book, { foreignKey: 'bookId' })
      Book_Cart.belongsTo(models.Cart, { foreignKey: 'cartId' })
    }
  }
  Book_Cart.init(
    {
      bookId: {
        type: DataTypes.INTEGER
      },
      cartId: {
        type: DataTypes.INTEGER
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      unitPrice: {
        type: DataTypes.DECIMAL(10, 2)
      }
    },
    {
      sequelize,
      modelName: 'Book_Cart'
    }
  )
  return Book_Cart
}
