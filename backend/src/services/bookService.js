import { Op } from 'sequelize'
import db from '~/models'
import slugify from '~/utils/slugify'
import getOrSetCache from '~/utils/getOrSetCache'

const responseBookData = async (limit, condition) => {
  const { count, rows } = await db.Book.findAndCountAll({ ...condition })
  return { totalRows: count, totalPages: Math.ceil(count / limit), books: rows }
}

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
  let { page, limit, name, parentCategory, category, price } = reqQuery
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

    const whereClause = {}

    // === Price filter ===
    let priceFilter = {}
    if (price) {
      const [minPrice, maxPrice] = price.split(',').map((p) => parseInt(p))
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        priceFilter = {
          discountedPrice: {
            [Op.gte]: minPrice,
            [Op.lte]: maxPrice
          }
        }
      }
    }

    // === Category filter ===
    if (category) {
      whereClause.categoryId = parseInt(category)
      Object.assign(whereClause, priceFilter)

      const condition = {
        where: whereClause,
        include: [{ model: db.Category }],
        offset,
        limit,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }

      return await responseBookData(limit, condition)
    }

    // === Parent Category filter ===
    if (parentCategory) {
      Object.assign(whereClause, priceFilter)

      const condition = {
        where: whereClause,
        include: [
          {
            model: db.Category,
            where: { listCateId: parseInt(parentCategory) }
          }
        ],
        offset,
        limit,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }

      return await responseBookData(limit, condition)
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
