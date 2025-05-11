import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import { env } from '~/config/environment'

import db from '~/models'
import { JwtProvider } from '~/providers/JwtProvider'
import ApiError from '~/utils/ApiError'

const getRolesOfGroup = async (groupId) => {
  return await db.Group.findAll({
    where: { id: groupId },
    include: [
      {
        model: db.Role,
        attributes: ['id', 'url', 'description'],
        through: { attributes: [] }
      }
    ]
  })
}

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

const login = async (reqBody, res) => {
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

    const allRolesOfGroup = await getRolesOfGroup(user.groupId)
    const payload = { userId: user.id, allRolesOfGroup }

    const accessToken = JwtProvider.generateToken(payload, env.ACCESS_TOKEN_SECRET_KEY, '1h')
    const refreshToken = JwtProvider.generateToken(payload, env.REFRESH_TOKEN_SECRET_KEY, '14 days')

    user.password = undefined

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })

    return user
  } catch (error) {
    throw error
  }
}

const refreshTokenAPI = (refreshToken, res) => {
  try {
    if (!refreshToken) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'No refresh token')
    }
    const tokenDecoded = JwtProvider.verifyToken(refreshToken, env.REFRESH_TOKEN_SECRET_KEY)

    const { exp, iat, ...payload } = tokenDecoded
    const accessToken = JwtProvider.generateToken(payload, env.ACCESS_TOKEN_SECRET_KEY, '1h')

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })
    return res.status(200).json({ accessToken })
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Refresh token API Failed!')
  }
}

export const authService = { signup, login, refreshTokenAPI }
