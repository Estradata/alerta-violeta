import { db } from '@/lib/db'
import { TokenError } from '@packages/errors'
import { decodeAdminToken } from '@/lib/jwt'
import { LoginResponse } from '@packages/auth-admin/types'
import { RequestHandler } from 'express'

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
    })

    if (!admin) throw new TokenError()

    const { password, ...data } = admin

    res.status(202).json({
      message: 'Login successful',
      data: {
        user: data,
        token,
      },
    } satisfies LoginResponse)
  } catch (err) {
    next(err)
  }
}
