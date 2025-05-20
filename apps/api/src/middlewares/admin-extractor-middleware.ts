import { TokenError } from '@packages/errors'
import { decodeAdminToken } from '@/lib/jwt'
import { NextFunction, Request, Response } from 'express'
import { db } from '@/lib/db'
import { getAdminPermissions } from '@/features/admins/utils'

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

    if (!token || !decodedToken.id) {
      throw new TokenError()
    }

    const admin = await db.admin.findUnique({
      where: { id: decodedToken.id },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
        customPermissions: true,
      },
    })

    if (!admin) throw new TokenError()

    const permissions = getAdminPermissions(admin)

    req.admin = {
      name: admin.name,
      accountId: admin.accountId,
      email: admin.email,
      id: admin.id,
      permissions,
    }

    next()
  } catch (err) {
    next(err)
  }
}
