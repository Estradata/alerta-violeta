import { AppError, HttpCode } from '@/lib/errors'
import { decodeToken } from '@/lib/jwt'
import { NextFunction, Request, Response } from 'express'

export default function userExtractor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.get('authorization')

  let token: string = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = decodeToken(token)

  if (!token || !decodedToken.id) {
    throw new AppError({
      description: 'Token missing or invalid',
      httpCode: HttpCode.UNAUTHORIZED,
    })
  }

  const { id: userId } = decodedToken

  req.userId = userId
  next()
}
