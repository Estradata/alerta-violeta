import { TokenError } from '@packages/errors'
import { decodeAdminToken } from '@/lib/jwt'
import { NextFunction, Request, Response } from 'express'
import { db } from '@/lib/db'

export default async function adminExtractor(
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

    const decodedToken = decodeAdminToken(token)

    console.log(decodedToken)

    if (!token || !decodedToken.id) {
      throw new TokenError()
    }

    const admin = await db.admin.findUnique({ where: { id: decodedToken.id } })

    console.log(admin)

    if (!admin) throw new TokenError()

    req.admin = {
      accountId: admin.accountId,
      email: admin.email,
      id: admin.id,
    }

    next()
  } catch (err) {
    next(err)
  }
}
