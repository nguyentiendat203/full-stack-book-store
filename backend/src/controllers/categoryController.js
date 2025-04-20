import { StatusCodes } from 'http-status-codes'
import { categoryService } from '~/services/categoryService'

const getAllCategory = async (req, res, next) => {
  try {
    const cates = await categoryService.getAllCate()
    return res.status(StatusCodes.OK).json(cates)
  } catch (error) {
    next(error)
  }
}

const getSubCategory = async (req, res, next) => {
  try {
    const cates = await categoryService.getSubCate(req.params.parentId)
    return res.status(StatusCodes.OK).json(cates)
  } catch (error) {
    next(error)
  }
}

export const categoryController = { getAllCategory, getSubCategory }
