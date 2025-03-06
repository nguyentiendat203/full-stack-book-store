'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class ListCate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ListCate.hasMany(models.Category)
    }
  }
  ListCate.init(
    {
      name: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'ListCate'
    }
  )
  return ListCate
}
