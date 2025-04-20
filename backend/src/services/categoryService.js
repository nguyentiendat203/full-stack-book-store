import db from '~/models'
import getOrSetCache from '~/utils/getOrSetCache'

const getSubCate = async (parentId) => {
  const cacheKey = `sub_categories:${parentId}`
  return await getOrSetCache(cacheKey, async () => {
    return await db.Category.findAll({
      where: { listCateId: parentId },
      include: [{ model: db.ListCate }],
      attributes: ['id', 'listCateId', 'name']
    })
  })
}

const getAllCate = async () => {
  return await getOrSetCache('categories', async () => {
    return await db.ListCate.findAll({ attributes: ['id', 'name'] })
  })
}

export const categoryService = { getAllCate, getSubCate }
