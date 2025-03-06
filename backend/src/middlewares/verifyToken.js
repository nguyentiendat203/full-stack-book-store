import { StatusCodes } from 'http-status-codes'
import { promisify } from 'util'
import jwt from 'jsonwebtoken'

import { env } from '~/config/environment'
import ApiError from '~/utils/ApiError'
import db from '~/models'

export const verifyToken = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    const token = req.cookies.token

    if (!token) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Bạn chưa đăng nhập, vui lòng đăng nhập'))
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, env.JWT_SECRET)

    // 3) Check if user still exists
    const currentUser = await db.User.findOne({
      where: { id: decoded.payload.userId }
    })
    if (!currentUser) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, 'The user belonging to this token does no longer exist.'))
    }
    req.dataPayload = decoded.payload
    req.user = currentUser
    next()
  } catch (error) {
    return next(new ApiError(StatusCodes.UNAUTHORIZED, 'User not authenticated!!!'))
  }
}
