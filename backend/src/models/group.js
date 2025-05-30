'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.hasMany(models.User, { foreignKey: 'groupId' })
      Group.belongsToMany(models.Role, { through: 'Group_Role', foreignKey: 'groupId', otherKey: 'roleId' })
    }
  }
  Group.init(
    {
      name: {
        type: DataTypes.INTEGER
      },
      description: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Group'
    }
  )
  return Group
}
