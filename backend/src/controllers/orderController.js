import StatusCodes from 'http-status-codes'
import { orderService } from '~/services/orderService'

const orderCart = async (req, res, next) => {
  try {
    const myOrder = await orderService.orderCart(req.user.id, req.body)
    return res.status(StatusCodes.OK).json(myOrder)
  } catch (error) {
    next(error)
  }
}

const getOrder = async (req, res, next) => {
  try {
    const orders = await orderService.getOrder(req.user.id)
    return res.status(StatusCodes.OK).json(orders)
  } catch (error) {
    next(error)
  }
}

const getOrderStatus = async (req, res, next) => {
  try {
    const orders = await orderService.getOrderStatus(req.user.id, req.params.status)
    return res.status(StatusCodes.OK).json(orders)
  } catch (error) {
    next(error)
  }
}

const getPurchases = async (req, res, next) => {
  try {
    const purchases = await orderService.getPurchases()
    return res.status(StatusCodes.OK).json(purchases)
  } catch (error) {
    next(error)
  }
}

const getAllOrder = async (req, res, next) => {
  try {
    const allOrders = await orderService.getAllOrder()
    return res.status(StatusCodes.OK).json(allOrders)
  } catch (error) {
    next(error)
  }
}

const updateStatusOrder = async (req, res, next) => {
  try {
    const order = await orderService.updateStatusOrder(req.body)
    return res.status(StatusCodes.OK).json(order)
  } catch (error) {
    next(error)
  }
}

export const orderController = {
  orderCart,
  getOrder,
  getOrderStatus,
  getPurchases,
  getAllOrder,
  updateStatusOrder
}
