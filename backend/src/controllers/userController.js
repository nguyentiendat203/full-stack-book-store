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
    await userService.updateMe(req.user.id, req.body)
    return res.status(StatusCodes.OK).json({ message: 'Successfully' })
  } catch (error) {
    next(error)
  }
}

const addCartUser = async (req, res, next) => {
  try {
    const cart = await userService.addCartUser(req.user.id, req.body)
    return res.status(StatusCodes.OK).json(cart)
  } catch (error) {
    next(error)
  }
}

const getMyCart = async (req, res, next) => {
  try {
    const myCart = await userService.getMyCart(req.user.id)
    return res.status(StatusCodes.OK).json(myCart)
  } catch (error) {
    next(error)
  }
}

const orderCart = async (req, res, next) => {
  try {
    const myOrder = await userService.orderCart(req.user.id, req.body)
    return res.status(StatusCodes.OK).json(myOrder)
  } catch (error) {
    next(error)
  }
}

const countQuantityCart = async (req, res, next) => {
  try {
    const quantityCart = await userService.countQuantityCart(req.params.userId)
    return res.status(StatusCodes.OK).json(quantityCart)
  } catch (error) {
    next(error)
  }
}

const updateCartQuantity = async (req, res, next) => {
  try {
    const cart = await userService.updateCartQuantity(req.user.id, req.body)
    return res.status(StatusCodes.OK).json(cart)
  } catch (error) {
    next(error)
  }
}

const deleteCartItem = async (req, res, next) => {
  try {
    const cart = await userService.deleteCartItem(req.user.id, req.params.bookId)
    return res.status(StatusCodes.OK).json(cart)
  } catch (error) {
    next(error)
  }
}

const getOrder = async (req, res, next) => {
  try {
    const orders = await userService.getOrder(req.user.id)
    return res.status(StatusCodes.OK).json(orders)
  } catch (error) {
    next(error)
  }
}

const getOrderStatus = async (req, res, next) => {
  try {
    const orders = await userService.getOrderStatus(req.user.id, req.params.status)
    return res.status(StatusCodes.OK).json(orders)
  } catch (error) {
    next(error)
  }
}

const getPurchases = async (req, res, next) => {
  try {
    const purchases = await userService.getPurchases()
    return res.status(StatusCodes.OK).json(purchases)
  } catch (error) {
    next(error)
  }
}

const recommendSystem = async (req, res, next) => {
  try {
    const purchases = await userService.recommendSystem(req.user?.id || 0, req.body)
    return res.status(StatusCodes.OK).json(purchases)
  } catch (error) {
    next(error)
  }
}

const getAllOrder = async (req, res, next) => {
  try {
    const allOrders = await userService.getAllOrder()
    return res.status(StatusCodes.OK).json(allOrders)
  } catch (error) {
    next(error)
  }
}

const updateStatusOrder = async (req, res, next) => {
  try {
    const order = await userService.updateStatusOrder(req.body)
    return res.status(StatusCodes.OK).json(order)
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
  addCartUser,
  getMyCart,
  orderCart,
  countQuantityCart,
  updateCartQuantity,
  deleteCartItem,
  getOrder,
  getOrderStatus,
  getPurchases,
  recommendSystem,
  getAllOrder,
  updateStatusOrder,
  sendEmail,
  changePassword
}
