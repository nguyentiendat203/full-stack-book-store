import db from '~/models'

const createNew = async (roles) => {
  try {
    const allCurrentRoles = await db.Role.findAll({
      attributes: ['url', 'description']
    })

    // ----- TOPIC: How to get the difference between two arrays of objects in JavaScript
    const results = roles.filter(({ url: url1 }) => !allCurrentRoles.some(({ url: url2 }) => url1 === url2))
    if (results.length == 0) {
      return { message: 'Roles already exist' }
    }
    await db.Role.bulkCreate(results)
    return { message: `${results.length} roles successfully created` }
  } catch (error) {
    throw error
  }
}

const getAllRoles = async () => {
  try {
    return await db.Role.findAll()
  } catch (error) {
    throw error
  }
}

const deleteRole = async (id) => {
  try {
    return await db.Role.destroy({
      where: {
        id
      }
    })
  } catch (error) {
    throw error
  }
}

const updateRole = async (reqBody) => {
  try {
    return await db.Role.update(reqBody, {
      where: {
        id: reqBody.id
      }
    })
  } catch (error) {
    throw error
  }
}

const getRoleByGroup = async (groupId) => {
  try {
    return await db.Group.findOne({
      where: {
        id: groupId
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: db.Role,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        through: { attributes: [] }
      }
    })
  } catch (error) {
    throw error
  }
}

const assignRoleToGroup = async (data) => {
  try {
    await db.Group_Role.destroy({ where: { groupId: data.groupId } })
    await db.Group_Role.bulkCreate(data.groupRoles)
    return { message: 'Assign successfully' }
  } catch (error) {
    throw error
  }
}

export const roleService = { createNew, getAllRoles, deleteRole, updateRole, getRoleByGroup, assignRoleToGroup }
