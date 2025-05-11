import { StatusCodes } from 'http-status-codes'

import { env } from '~/config/environment'
import ApiError from '~/utils/ApiError'
import db from '~/models'
import { JwtProvider } from '~/providers/JwtProvider'

export const protectRoute = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    const accessToken = req.cookies.accessToken

    if (!accessToken) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Bạn chưa đăng nhập, vui lòng đăng nhập'))
    }

    // 2) Verification token
    const tokenDecoded = JwtProvider.verifyToken(accessToken, env.ACCESS_TOKEN_SECRET_KEY)

    // 3) Check if user still exists
    const currentUser = await db.User.findOne({
      where: { id: tokenDecoded.userId }
    })
    if (!currentUser) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, 'The user belonging to this token does no longer exist.'))
    }
    req.dataPayload = tokenDecoded
    req.user = currentUser
    next()
  } catch (error) {
    if (error.message.includes('jwt expired')) {
      return next(new ApiError(StatusCodes.GONE, 'Access Token has expired!'))
    }
    return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized User !'))
  }
}
