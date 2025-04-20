import { Op } from 'sequelize'
import db from '~/models'
import slugify from '~/utils/slugify'
import getOrSetCache from '~/utils/getOrSetCache'

const createNew = async (reqBody) => {
  try {
    const newBook = {
      ...reqBody,
      slug: slugify(reqBody.name)
    }

    return await db.Book.create(newBook)
  } catch (error) {
    throw error
  }
}
const getAll = async (reqQuery) => {
  let { page, limit, name, category } = reqQuery
  page = parseInt(page) || 1
  limit = parseInt(limit) || 10
  const offset = (page - 1) * limit
  try {
    if (name) {
      return await db.Book.findAll({
        where: { name: { [Op.like]: `%${name}%` } },
        limit,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
    }

    if (category) {
      const { count, rows } = await db.Book.findAndCountAll({
        where: { categoryId: parseInt(category) },
        include: [{ model: db.Category }],
        offset,
        limit,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })

      return { totalRows: count, totalPages: Math.ceil(count / limit), books: rows }
    }

    const { count, rows } = await getOrSetCache(`books-page:${page}`, async () => {
      return await db.Book.findAndCountAll({
        offset,
        limit,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
    })
    return { totalRows: count, totalPages: Math.ceil(count / limit), books: rows }
  } catch (error) {
    throw error
  }
}

const getDetail = async (bookId) => {
  try {
    return await db.Book.findOne({
      where: { id: bookId },
      // attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [{ model: db.Supplier }, { model: db.Category }]
    })
  } catch (error) {
    throw error
  }
}

const updateDetail = async (reqBody) => {
  delete reqBody.SupplierId
  delete reqBody.CategoryId
  try {
    return await db.Book.update(reqBody, {
      where: {
        id: reqBody.id
      }
    })
  } catch (error) {
    throw error
  }
}
const deleteDetail = async (bookId) => {
  try {
    return await db.Book.destroy({
      where: {
        id: bookId
      }
    })
  } catch (error) {
    throw error
  }
}

export const bookService = { createNew, getAll, getDetail, updateDetail, deleteDetail }
