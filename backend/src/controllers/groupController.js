import { StatusCodes } from 'http-status-codes'
import { groupService } from '~/services/groupService'

const getAllGroup = async (req, res, next) => {
  try {
    const groups = await groupService.getAllGroup()
    return res.status(StatusCodes.OK).json(groups)
  } catch (error) {
    next(error)
  }
}

export const groupController = { getAllGroup }
