import { JWT_SECRET_ADMIN, JWT_SECRET_APP } from '@/config'
import jwt from 'jsonwebtoken'

type UserToken = {
  id: string
  email: string
}

/**
 * Admin Users
 */
export function encodeAdminToken(user: UserToken): string {
  const token = jwt.sign(user, JWT_SECRET_ADMIN)
  return token
}

export function decodeAdminToken(token: string): UserToken {
  return jwt.verify(token, JWT_SECRET_ADMIN) as {
    id: string
    email: string
  }
}

/**
 * App Users
 */
export function encodeUserToken(user: UserToken): string {
  const token = jwt.sign(user, JWT_SECRET_APP)
  return token
}

export function decodeUserToken(token: string): UserToken {
  return jwt.verify(token, JWT_SECRET_APP) as {
    id: string
    email: string
  }
}
