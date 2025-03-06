import db from '~/models'

const getAll = () => {
  try {
    return db.Category.findAll({ attributes: ['id', 'name'] })
  } catch (error) {
    throw error
  }
}
export const categoryService = { getAll }
