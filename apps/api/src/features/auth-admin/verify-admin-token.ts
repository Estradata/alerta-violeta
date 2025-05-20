import { db } from '@/lib/db'
import { TokenError } from '@packages/errors'
import { decodeAdminToken } from '@/lib/jwt'
import { LoginResponse } from '@packages/auth-admin/types'
import { RequestHandler } from 'express'
import { getAdminPermissions } from '@/features/admins/utils'

export const verifyAdminToken: RequestHandler = async (req, res, next) => {
  try {
    const authorization = req.get('authorization')
    let token: string = ''

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
    }

    if (!token) {
      throw new TokenError()
    }

    const decodedToken = decodeAdminToken(token)

    if (!decodedToken || !decodedToken.id) {
      throw new TokenError()
    }

    const admin = await db.admin.findUnique({
      where: {
        id: decodedToken.id,
      },
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

    const { password, ...data } = admin
    const permissions = getAdminPermissions(admin)

    res.status(202).json({
      message: 'Login successful',
      data: {
        user: {
          name: data.name,
          accountId: data.accountId,
          email: data.email,
          id: data.id,
          permissions,
        },
        token,
      },
    } satisfies LoginResponse)
  } catch (err) {
    next(err)
  }
}
