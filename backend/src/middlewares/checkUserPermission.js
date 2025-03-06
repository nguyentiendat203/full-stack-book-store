import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

export const checkUserPermission = (req, res, next) => {
  let currentUrl = req.baseUrl + req.path
  const roles = req.dataPayload.allRolesOfGroup[0].Roles

  if (!roles || roles.length == 0) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'You dont have permission to access this resource!')
  }
  let checkRole = roles.some((item) => item.url === currentUrl || currentUrl.includes(item.url))
  if (checkRole) {
    return next()
  } else {
    throw new ApiError(StatusCodes.FORBIDDEN, 'You dont have permission to access this resource!')
  }
}
