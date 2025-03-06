import { StatusCodes } from 'http-status-codes'
import { categoryService } from '~/services/categoryService'

const getAllCategory = async (req, res, next) => {
  try {
    const cates = await categoryService.getAll()
    return res.status(StatusCodes.OK).json(cates)
  } catch (error) {
    next(error)
  }
}

export const categoryController = { getAllCategory }
