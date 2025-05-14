import { TokenError } from '@packages/errors'
import { decodeUserToken } from '@/lib/jwt'
import { NextFunction, Request, Response } from 'express'
import { db } from '@/lib/db'

export default async function userExtractor(
  req: Request,
  _: Response,
  next: NextFunction
) {
  try {
    const authorization = req.get('authorization')

    let token: string = ''

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
    }

    const decodedToken = decodeUserToken(token)

    if (!token || !decodedToken.id) {
      throw new TokenError()
    }

    const user = await db.user.findUnique({ where: { id: decodedToken.id } })

    if (!user) throw new TokenError()

    req.user = {
      accountId: user.accountId,
      email: user.email,
      id: user.id,
      name: user.name,
      status: user.status,
    }

    next()
  } catch (err) {
    next(err)
  }
}
