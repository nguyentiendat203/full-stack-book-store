'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Book)
      Review.belongsTo(models.User)
    }
  }
  Review.init(
    {
      review: {
        type: DataTypes.STRING
      },
      rate: {
        type: DataTypes.INTEGER
      },
      bookId: {
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'Review'
    }
  )
  return Review
}
