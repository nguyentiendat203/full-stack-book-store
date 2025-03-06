import db from '~/models'

const getAllGroup = async () => {
  try {
    return await db.Group.findAll({ attributes: ['id', 'name', 'description'] })
  } catch (error) {
    throw error
  }
}

export const groupService = { getAllGroup }
