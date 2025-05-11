import JWT from 'jsonwebtoken'

const generateToken = (payload, secretKey, tokenLife) => {
  return JWT.sign(payload, secretKey, { algorithm: 'HS256', expiresIn: tokenLife })
}

const verifyToken = (accessToken, secretKey) => {
  return JWT.verify(accessToken, secretKey)
}

export const JwtProvider = { generateToken, verifyToken }
