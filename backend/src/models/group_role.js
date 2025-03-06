'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Group_Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Group_Role.init(
    {
      groupId: {
        type: DataTypes.INTEGER
      },
      roleId: {
        type: DataTypes.INTEGER
      },
      isRole: {
        type: DataTypes.BOOLEAN
      }
    },
    {
      sequelize,
      modelName: 'Group_Role'
    }
  )
  return Group_Role
}
