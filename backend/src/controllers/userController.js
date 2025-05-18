import StatusCodes from 'http-status-codes'
import { userService } from '~/services/userService'
import { createSignToken } from '~/utils/createSignToken'

const createUser = async (req, res, next) => {
  try {
    await userService.createNew(req.body)
    return res.status(StatusCodes.CREATED).json({ message: 'Create Successfully' })
  } catch (error) {
    next(error)
  }
}

const getAllUser = async (req, res, next) => {
  try {
    const users = await userService.getAll()
    return res.status(StatusCodes.CREATED).json(users)
  } catch (error) {
    next(error)
  }
}

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getDetail(req.query.id)
    return res.status(StatusCodes.CREATED).json(user)
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    await userService.updateDetail(req.body)
    return res.status(StatusCodes.CREATED).json({ message: 'Update Successfully' })
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteDetail(req.body.id)
    return res.status(StatusCodes.CREATED).json({ message: 'Successfully' })
  } catch (error) {
    next(error)
  }
}

const updatePassword = async (req, res, next) => {
  try {
    const user = await userService.updatePassword(req.body, req.user)
    createSignToken(user, StatusCodes.OK, res)
  } catch (error) {
    next(error)
  }
}

const updateMe = async (req, res, next) => {
  try {
    const data = await userService.updateMe(req.user.id, req.body, req.file)
    return res.status(StatusCodes.OK).json(data)
  } catch (error) {
    next(error)
  }
}

const sendEmail = async (req, res, next) => {
  try {
    const message = await userService.sendEmail(req.body.email)
    return res.status(StatusCodes.OK).json(message)
  } catch (error) {
    next(error)
  }
}

const changePassword = async (req, res, next) => {
  try {
    const data = await userService.changePassword(req.body)
    return res.status(StatusCodes.OK).json(data)
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  updatePassword,
  updateMe,
  sendEmail,
  changePassword
}
