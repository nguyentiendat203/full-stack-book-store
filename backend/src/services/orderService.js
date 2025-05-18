import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'

import db from '~/models'
import ApiError from '~/utils/ApiError'

const getBooksInOrder = async (userId) => {
  return await db.Order.findAll({
    where: { userId },
    include: [
      {
        model: db.Book,
        through: { attributes: ['quantity', 'unitPrice'] }
      }
    ],
    order: [['id', 'DESC']]
  })
}

const orderCart = async (userId, reqBody) => {
  const transaction = await db.sequelize.transaction()
  try {
    // 1. Find user's cart
    const cart = await db.Cart.findOne({ where: { userId }, transaction })
    if (!cart) throw new ApiError(StatusCodes.NOT_FOUND, 'Cart not found')

    // 2. Get all books in cart (with Book_Cart info)
    const booksInCart = await db.Book_Cart.findAll({
      where: { cartId: cart.id },
      include: [{ model: db.Book }],
      transaction
    })
    if (!booksInCart.length) throw new ApiError(StatusCodes.BAD_REQUEST, 'No books in cart')

    // 3. Create order
    const order = await db.Order.create({ userId, ...reqBody }, { transaction })

    // 4. Create Book_Order entries and update Book stock/sold
    for (const item of booksInCart) {
      if (!item.Book) throw new ApiError(StatusCodes.NOT_FOUND, 'Book not found')
      if (item.Book.stock < item.quantity) {
        throw new ApiError(StatusCodes.BAD_REQUEST, `* Sách ${item.Book.name} chỉ còn tồn kho ${item.Book.stock}`)
      }
      await db.Book_Order.create(
        {
          orderId: order.id,
          bookId: item.bookId,
          quantity: item.quantity,
          unitPrice: item.unitPrice
        },
        { transaction }
      )
      // Update book stock and sold
      item.Book.stock -= item.quantity
      item.Book.sold += item.quantity
      await item.Book.save({ transaction })
    }

    // 5. Set order total price
    order.totalOrderPrice = cart.totalCartPrice
    await order.save({ transaction })

    // 6. Clear cart
    await db.Book_Cart.destroy({ where: { cartId: cart.id }, transaction })
    await db.Cart.destroy({ where: { id: cart.id }, transaction })

    await transaction.commit()
    return { message: 'Đặt hàng thành công' }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const getOrder = async (userId) => {
  try {
    let order = await db.Order.findAll({
      where: { userId }
    })
    if (!order) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Order not found!')
    }

    // const inforMyOrder = await getBooksInOrderByStatus(userId, 4)
    const inforMyOrder = await getBooksInOrder(userId)

    return inforMyOrder
  } catch (error) {
    throw error
  }
}

const getOrderStatus = async (userId, status) => {
  try {
    const inforMyOrder = await db.Order.findAll({
      where: {
        [Op.and]: [{ userId }, { status }]
      },
      include: { model: db.Book },
      order: [['id', 'DESC']]
    })

    return inforMyOrder
  } catch (error) {
    throw error
  }
}

const getPurchases = async () => {
  try {
    const orders = await db.Order.findAll({
      include: [
        { model: db.User, attributes: ['id'] },
        { model: db.Book, attributes: ['id'] }
      ]
    })

    const purchases = []
    orders.forEach((order) => {
      const userId = order.userId
      order.Books.map((item) => {
        purchases.push({ user_id: userId, item_id: item.id })
      })
    })

    return purchases
  } catch (error) {
    throw error
  }
}

const getAllOrder = async () => {
  try {
    return await db.Order.findAll({
      include: { model: db.Book },
      order: [['id', 'DESC']]
    })
  } catch (error) {
    throw error
  }
}

const updateStatusOrder = async (reqBody) => {
  try {
    return await db.Order.update(reqBody, {
      where: {
        id: reqBody.id
      }
    })
  } catch (error) {
    throw error
  }
}

export const orderService = {
  orderCart,
  getOrder,
  getOrderStatus,
  getPurchases,
  getAllOrder,
  updateStatusOrder
}
