import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

import { mailOptions, transporter } from '~/mail'
import db from '~/models'
import ApiError from '~/utils/ApiError'
import { recommendItems } from '~/utils/recommendSystem'

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

const checkEmailExist = async (email) => {
  try {
    return await db.User.findOne({ where: { email } })
  } catch (error) {
    throw error
  }
}
const createNew = async (reqBody) => {
  try {
    const emailExist = await checkEmailExist(reqBody.email)
    if (emailExist) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Email has already exist !')
    }
    const newUser = {
      ...reqBody,
      avatar: '/no-user.png',
      password: await bcrypt.hash(reqBody.password, 12)
    }
    return await db.User.create(newUser)
  } catch (error) {
    throw error
  }
}

const getAll = async () => {
  try {
    return await db.User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email'],
      include: { model: db.Group, attributes: ['name'] },
      order: [['id', 'DESC']]
    })
  } catch (error) {
    throw error
  }
}

const getDetail = async (userId) => {
  try {
    return await db.User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'GroupId'] },
      include: { model: db.Group }
    })
  } catch (error) {
    throw error
  }
}

const updateDetail = async (reqBody) => {
  try {
    return await db.User.update(reqBody, {
      where: {
        id: reqBody.id
      }
    })
  } catch (error) {
    throw error
  }
}

const deleteDetail = async (userId) => {
  try {
    return await db.User.destroy({
      where: {
        id: userId
      }
    })
  } catch (error) {
    throw error
  }
}

const updatePassword = async (reqBody, currentUser) => {
  const { currentPassword, newPassword } = reqBody

  // 1) Get user from collection
  const user = await db.User.findOne({
    where: { id: currentUser.id }
  })

  // 2) Check if POSTed current password is correct
  if (!(await bcrypt.compare(currentPassword, currentUser.password))) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Your current password is wrong.')
  }
  // // 3) If so, update password
  user.password = await bcrypt.hash(newPassword, 12)

  await user.save()
  return user.dataValues
}

const updateMe = async (userId, reqBody) => {
  try {
    return await db.User.update(reqBody, {
      where: {
        id: userId
      }
    })
  } catch (error) {
    throw error
  }
}

const addCartUser = async (userId, reqBody) => {
  const { bookId, quantity } = reqBody
  try {
    // --- 1: Tìm kiếm Cart của User đã đăng nhập
    let cart = await db.Cart.findOne({ where: { userId } })

    // --- 2: Nếu không có thì tạo mới Cart
    if (!cart) {
      cart = await db.Cart.create({ userId })
    }

    // --- 3: Tìm tất cả sản phẩm thuộc trong Cart ủa User
    let bookCart = await db.Book_Cart.findOne({
      where: {
        [Op.and]: [{ cartId: cart.id }, { bookId }]
      }
    })
    // Tìm sách để lấy giá
    const book = await db.Book.findOne({ where: { id: bookId } })
    if (book.stock < quantity) {
      throw new ApiError(StatusCodes.BAD_REQUEST, `* Sách ${book.name} chỉ còn tồn kho ${book.stock}`)
    }
    // --- 4: Nếu đã có Book trong Cart thì tăng số lượng lên
    if (bookCart) {
      bookCart.quantity += quantity
      if (book.stock < bookCart.quantity) {
        throw new ApiError(StatusCodes.BAD_REQUEST, `* Sách ${book.name} chỉ còn tồn kho ${book.stock}`)
      }
      bookCart.unitPrice = (book.price * bookCart.quantity * (100 - book.discount)) / 100
      await bookCart.save()
    } else {
      // --- 5: Nếu chưa có Book trong Cart thì thêm mới vào Cart
      const test = (book.price * quantity * (100 - book.discount)) / 100
      await db.Book_Cart.create({ CartId: cart.id, BookId: bookId, quantity, unitPrice: test })
    }

    // ---6 Tính toán tổng số lượng sản phẩm trong giỏ hàng
    const booksInCart = await getBooksInCartUser(cart)

    let totalQuantity = 0
    let totalPrice = 0
    booksInCart.Books.forEach((book) => {
      totalQuantity += 1
      totalPrice += book.Book_Cart.unitPrice
    })
    booksInCart.totalQuantity = totalQuantity
    booksInCart.totalCartPrice = totalPrice
    await booksInCart.save()

    return bookCart
  } catch (error) {
    throw error
  }
}

const getMyCart = async (userId) => {
  try {
    let cart = await db.Cart.findOne({ where: { userId } })
    if (!cart) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Cart not found!')
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
    // if (bookCart.Books.length <= 0) {
    //   throw new ApiError(StatusCodes.NOT_FOUND, 'Chua co san pham trong gio hang')
    // }

    return bookCart
  } catch (error) {
    throw error
  }
}

const orderCart = async (userId, reqBody) => {
  const transaction = await db.sequelize.transaction()
  try {
    let cart = await db.Cart.findOne({ where: { userId } })

    if (!cart) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Cart not found')
    }
    const order = await db.Order.create({ userId, ...reqBody }, { transaction })

    const booksInCart = await getBooksInCartUser(cart)
    for (const book of booksInCart.Books) {
      await db.Book_Order.create({
        OrderId: order.id,
        BookId: book.id,
        quantity: book.Book_Cart.quantity,
        unitPrice: book.Book_Cart.unitPrice
      })
      book.stock -= book.Book_Cart.quantity
      book.sold += book.Book_Cart.quantity
      await book.save({ transaction })
    }
    order.totalOrderPrice = cart.totalCartPrice
    await order.save({ transaction })
    await db.Book_Cart.destroy({ where: { cartId: cart.id }, transaction })
    await db.Cart.destroy({ where: { id: cart.id }, transaction })
    await transaction.commit()
    return { message: 'Đặt hàng thành công' }
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

    // Cập nhật số lượng
    const discountPercent = book.discount || 0
    const discountFactor = (100 - discountPercent) / 100

    bookCart.unitPrice = book.price * bookCart.quantity * discountFactor
    await bookCart.save()

    // Cập nhật tổng tiền của giỏ hàng
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
    const bookCarts = await db.Book_Cart.findAll({ where: { cartId: cart.id } })
    const totalCartPrice = bookCarts.reduce((acc, item) => acc + item.unitPrice, 0)

    const booksInCart = await getBooksInCartUser(cart)

    booksInCart.totalCartPrice = totalCartPrice

    let totalItemCart = 0
    booksInCart.Books.forEach(() => {
      totalItemCart += 1
    })
    booksInCart.totalQuantity = totalItemCart
    await booksInCart.save()
    return booksInCart
  } catch (error) {
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

const recommendSystem = async (userId, reqBody) => {
  try {
    const { numNeighbors, numRecommendations } = reqBody
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

    const recommendations = recommendItems(purchases, userId, numNeighbors, numRecommendations)
    return recommendations
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

const sendEmail = async (email) => {
  try {
    const user = await db.User.findOne({ where: { email } })
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Email không tồn tại!')
    }

    const code = uuidv4()
    await db.User.update(
      { codeId: code },
      {
        where: { id: user.id }
      }
    )

    transporter.sendMail(mailOptions(user.email, code))

    return { id: user.id, message: 'send email' }
  } catch (error) {
    throw error
  }
}

const changePassword = async (reqBody) => {
  const { code, password, confirmPassword, userEmail } = reqBody
  try {
    const user = await db.User.findOne({ where: [{ email: userEmail }, { codeId: code }] })
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User không tồn tại!')
    }

    if (password !== confirmPassword) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Mật khẩu xác nhận không đúng!')
    }
    const hashedPassword = await bcrypt.hash(password, 12)

    await db.User.update(
      { password: hashedPassword },
      {
        where: { id: user.id }
      }
    )

    return { id: user.id, message: 'Cập nhật mật khẩu thành công' }
  } catch (error) {
    throw error
  }
}

export const userService = {
  createNew,
  getAll,
  getDetail,
  updateDetail,
  deleteDetail,
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
