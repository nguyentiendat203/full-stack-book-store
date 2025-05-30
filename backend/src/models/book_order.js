'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Book_Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book_Order.init(
    {
      bookId: {
        type: DataTypes.INTEGER
      },
      orderId: {
        type: DataTypes.INTEGER
      },
      quantity: DataTypes.INTEGER,
      unitPrice: {
        type: DataTypes.DECIMAL(10, 2)
      }
    },
    {
      sequelize,
      modelName: 'Book_Order'
    }
  )
  return Book_Order
}
