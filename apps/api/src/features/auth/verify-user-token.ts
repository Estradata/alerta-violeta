import { db } from '@/lib/db'
import { UnauthorizedError } from '@/lib/errors'
import { decodeToken } from '@/lib/jwt'
import { LoginResponse } from '@packages/auth/types'
import { RequestHandler } from 'express'

export const verifyUserToken: RequestHandler = async (req, res, next) => {
  try {
    const authorization = req.get('authorization')
    let token: string = ''

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
    }

    if (!token) {
      throw new UnauthorizedError('Token missing or invalid')
    }

    const decodedToken = decodeToken(token)

    if (!decodedToken || !decodedToken.id) {
      throw new UnauthorizedError('Token missing or invalid')
    }

    const user = await db.user.findUnique({
      where: {
        id: decodedToken.id,
      },
    })

    if (!user) throw new UnauthorizedError('Token missing or invalid')

    const { password, ...data } = user

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
