import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'
import { v4 as uuidv4 } from 'uuid'
import { mailOptions, transporter } from '~/mail'

import db from '~/models'
import { cloudinaryProvider } from '~/providers/cloudinaryProvider'
import ApiError from '~/utils/ApiError'

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

const updateMe = async (userId, reqBody, reqFile) => {
  try {
    let result = null
    if (reqFile) result = await cloudinaryProvider.uploadSteamImage(reqFile.buffer)
    await db.User.update(reqFile ? { avatar: result?.secure_url } : reqBody, {
      where: { id: userId }
    })

    return await db.User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'GroupId'] },
      include: { model: db.Group }
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
  changePassword,
  sendEmail
}
