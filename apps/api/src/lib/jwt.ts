import { JWT_SECRET } from '@/config'
import jwt from 'jsonwebtoken'

type UserToken = {
  id: string
  email: string
}

export function decodeToken(token: string): UserToken {
  return jwt.verify(token, JWT_SECRET) as {
    id: string
    email: string
  }
}

export function encodeUserToken(user: UserToken): string {
  const token = jwt.sign(user, JWT_SECRET)
  return token
}
