import { StatusCodes } from 'http-status-codes'
import { authService } from '~/services/authService'

const signup = async (req, res, next) => {
  try {
    await authService.signup(req.body)
    return res.status(StatusCodes.CREATED).json({ message: 'Đăng ký thành công' })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await authService.login(req.body, res)
    return res.status(StatusCodes.OK).json(user)
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res) => {
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')
  return res.status(StatusCodes.OK).json({ status: 'Logout Successful' })
}

const refreshTokenAPI = async (req, res, next) => {
  try {
    return authService.refreshTokenAPI(req.cookies.refreshToken, res)
  } catch (error) {
    next(error)
  }
}

export const authController = { signup, login, logout, refreshTokenAPI }
