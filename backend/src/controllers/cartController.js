import StatusCodes from 'http-status-codes'
import { cartService } from '~/services/cartService'

const addCartUser = async (req, res, next) => {
  try {
    const cart = await cartService.addCartUser(req.user.id, req.body)
    return res.status(StatusCodes.OK).json(cart)
  } catch (error) {
    next(error)
  }
}

const getMyCart = async (req, res, next) => {
  try {
    const myCart = await cartService.getMyCart(req.user.id)
    return res.status(StatusCodes.OK).json(myCart)
  } catch (error) {
    next(error)
  }
}

const countQuantityCart = async (req, res, next) => {
  try {
    const quantityCart = await cartService.countQuantityCart(req.user.id)
    return res.status(StatusCodes.OK).json(quantityCart)
  } catch (error) {
    next(error)
  }
}

const updateCartQuantity = async (req, res, next) => {
  try {
    const cart = await cartService.updateCartQuantity(req.user.id, req.body)
    return res.status(StatusCodes.OK).json(cart)
  } catch (error) {
    next(error)
  }
}

const deleteCartItem = async (req, res, next) => {
  try {
    const cart = await cartService.deleteCartItem(req.user.id, req.params.bookId)
    return res.status(StatusCodes.OK).json(cart)
  } catch (error) {
    next(error)
  }
}

export const cartController = {
  addCartUser,
  getMyCart,
  countQuantityCart,
  updateCartQuantity,
  deleteCartItem
}
