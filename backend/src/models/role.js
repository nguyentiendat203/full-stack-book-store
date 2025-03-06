'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.belongsToMany(models.Group, { through: 'Group_Role', foreignKey: 'roleId' })
    }
  }
  Role.init(
    {
      url: {
        type: DataTypes.INTEGER
      },
      description: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Role'
    }
  )
  return Role
}
