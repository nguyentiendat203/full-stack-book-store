import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'

import db from '~/models'
import ApiError from '~/utils/ApiError'

const signup = async (reqBody) => {
  try {
    const newUser = {
      ...reqBody,
      avatar: '/no-user.png',
      password: await bcrypt.hash(reqBody.password, 12)
    }
    return await db.User.create(newUser, { raw: true })
  } catch (error) {
    throw error
  }
}

const login = async (reqBody) => {
  try {
    const { email, password } = reqBody

    if (!email || !password) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Vui lòng nhập email và mật khẩu')
    }

    const user = await db.User.findOne({
      where: { email }
    })
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Email không tồn tại!')
    }
    const matchUser = await bcrypt.compare(password, user.password)
    if (!matchUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Sai mật khẩu!')
    }
    return user
  } catch (error) {
    throw error
  }
}

export const authService = { signup, login }
