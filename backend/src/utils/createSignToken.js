import { env } from '~/config/environment'
import jwt from 'jsonwebtoken'
import db from '~/models'

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
const signToken = (payload) => {
  return jwt.sign({ payload }, env.JWT_SECRET, {
    //---JWT hết hạn sau 3d - 3ngày
    expiresIn: env.JWT_EXPIRES_IN
  })
}

export const createSignToken = async (user, statusCode, res) => {
  const allRolesOfGroup = await getRolesOfGroup(user.groupId)
  const payload = {
    userId: user.id,
    allRolesOfGroup
  }
  const token = signToken(payload)
  const cookieOptions = {
    expires: new Date(
      //--Đổi thời gian 3 ngày lưu cookie sang milisecond
      Date.now() + env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  }
  if (env.BUILD_MODE === 'production') cookieOptions.secure = true

  user.password = undefined

  res.cookie('token', token, cookieOptions)
  const data = {
    ...user.dataValues,
    allRolesOfGroup: allRolesOfGroup[0]
  }

  return res.status(statusCode).json(data)
}
