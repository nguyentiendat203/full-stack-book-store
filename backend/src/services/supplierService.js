import db from '~/models'

const getAll = () => {
  try {
    return db.Supplier.findAll({ attributes: ['id', 'name'] })
  } catch (error) {
    throw error
  }
}
export const supplierService = { getAll }
