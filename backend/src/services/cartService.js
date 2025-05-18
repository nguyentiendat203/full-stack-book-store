import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'

import db from '~/models'
import ApiError from '~/utils/ApiError'

const getBooksInCartUser = async (cart) => {
  return await db.Cart.findOne({
    where: { id: cart.id },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: db.Book,
        through: { attributes: ['quantity', 'unitPrice'] }
      }
    ]
  })
}

const addCartUser = async (userId, reqBody) => {
  const { bookId, quantity } = reqBody
  const t = await db.sequelize.transaction()
  try {
    // 1: Find or create Cart for the user
    let [cart] = await db.Cart.findOrCreate({
      where: { userId },
      defaults: { userId },
      transaction: t
    })

    // 2: Find the Book
    const book = await db.Book.findOne({ where: { id: bookId } })
    if (!book) throw new ApiError(StatusCodes.NOT_FOUND, 'Book not found')
    if (book.stock < quantity) throw new ApiError(StatusCodes.BAD_REQUEST, `* Sách ${book.name} chỉ còn tồn kho ${book.stock}`)

    // 3: Find or create Book_Cart
    let [bookCart, created] = await db.Book_Cart.findOrCreate({
      where: { cartId: cart.id, bookId },
      defaults: { cartId: cart.id, bookId, quantity, unitPrice: book.discountedPrice * quantity },
      transaction: t
    })

    if (!created) {
      // If already exists, increment quantity
      bookCart.quantity += quantity
      if (book.stock < bookCart.quantity) throw new ApiError(StatusCodes.BAD_REQUEST, `* Sách ${book.name} chỉ còn tồn kho ${book.stock}`)
      bookCart.unitPrice = book.discountedPrice * bookCart.quantity
      await bookCart.save({ transaction: t })
    }

    // 4: Recalculate cart totals
    const bookCarts = await db.Book_Cart.findAll({ where: { cartId: cart.id }, transaction: t })
    const totalQuantity = bookCarts.length
    const totalCartPrice = bookCarts.reduce((acc, item) => acc + item.unitPrice, 0)
    cart.totalQuantity = totalQuantity
    cart.totalCartPrice = totalCartPrice
    await cart.save({ transaction: t })

    await t.commit()
    // Return cart with books
    return cart
  } catch (error) {
    await t.rollback()
    throw error
  }
}

const getMyCart = async (userId) => {
  try {
    let cart = await db.Cart.findOne({ where: { userId } })
    if (!cart) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Vui lòng thêm sách vào giỏ hàng')
    }
    const bookCart = await db.Cart.findOne({
      where: { id: cart.id },
      include: [
        {
          model: db.Book,
          // attributes: ['name', 'price', 'discount'],
          through: { attributes: ['quantity', 'unitPrice'] }
        }
      ]
    })

    return bookCart
  } catch (error) {
    throw error
  }
}

const countQuantityCart = async (userId) => {
  try {
    const cart = await db.Cart.findOne({ where: { userId } })

    if (!cart) {
      return { totalQuantity: 0 }
    }
    return cart
  } catch (error) {
    throw error
  }
}

const updateCartQuantity = async (userId, reqBody) => {
  const { bookId, quantityChange } = reqBody
  try {
    const cart = await db.Cart.findOne({ where: { userId } })

    let bookCart = await db.Book_Cart.findOne({
      where: {
        [Op.and]: [{ cartId: cart.id }, { bookId }]
      }
    })
    if (!bookCart) {
      throw new Error('Book not found in cart')
    }
    const book = await db.Book.findOne({ where: { id: bookId } })
    if (!book) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Book not found')
    }

    bookCart.quantity += quantityChange
    if (book.stock < bookCart.quantity) {
      throw new ApiError(StatusCodes.BAD_REQUEST, `* Sách ${book.name} không có sẵn`)
    }
    if (bookCart.quantity < 1) {
      bookCart.quantity = 1
    }
    bookCart.save()

    // Update unit price based on quantity and discount
    const discountPercent = book.discount || 0
    const discountFactor = (100 - discountPercent) / 100

    bookCart.unitPrice = book.price * bookCart.quantity * discountFactor
    await bookCart.save()

    // Upodate cart total price
    const bookCarts = await db.Book_Cart.findAll({ where: { cartId: cart.id } })
    const totalCartPrice = bookCarts.reduce((acc, item) => acc + item.unitPrice, 0)

    cart.totalCartPrice = totalCartPrice
    await cart.save()
    return { bookCart, totalCartPrice }
  } catch (error) {
    throw error
  }
}

const deleteCartItem = async (userId, bookId) => {
  try {
    const cart = await db.Cart.findOne({ where: { userId } })

    await db.Book_Cart.destroy({
      where: {
        [Op.and]: [{ cartId: cart.id }, { bookId }]
      }
    })

    const cartInfo = await getBooksInCartUser(cart)

    let totalItemCart = 0
    let totalCartPrice = 0
    for (const book of cartInfo.Books) {
      totalItemCart += 1
      totalCartPrice += book.Book_Cart.unitPrice
    }
    cartInfo.totalCartPrice = totalCartPrice
    cartInfo.totalQuantity = totalItemCart
    await cartInfo.save()
    return cartInfo
  } catch (error) {
    throw error
  }
}

export const cartService = {
  addCartUser,
  getMyCart,
  countQuantityCart,
  updateCartQuantity,
  deleteCartItem
}
