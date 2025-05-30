'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId' })
      Order.belongsToMany(models.Book, { through: 'Book_Order', foreignKey: 'orderId', otherKey: 'bookId' })
    }
  }
  Order.init(
    {
      userId: {
        type: DataTypes.INTEGER
      },
      fullName: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      totalOrderPrice: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      status: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'Order'
    }
  )
  return Order
}
