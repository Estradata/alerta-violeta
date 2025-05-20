import { db } from '@/lib/db'
import { TokenError, UnauthorizedError } from '@packages/errors'
import { decodeUserToken } from '@/lib/jwt'
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
      throw new TokenError()
    }

    const decodedToken = decodeUserToken(token)

    if (!decodedToken || !decodedToken.id) {
      throw new TokenError()
    }

    const user = await db.user.findUnique({
      where: {
        id: decodedToken.id,
      },
    })

    if (!user) throw new TokenError()

    /**
     * Update last login
     */
    await db.user.update({
      where: { id: user.id },
      data: {
        lastLogin: new Date(),
      },
    })

    if (user.status === 'BLOCKED')
      throw new UnauthorizedError('Esta cuenta se encuentra bloqueada')

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
