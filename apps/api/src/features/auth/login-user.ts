import { db } from '@/lib/db'
import { UnauthorizedError } from '@packages/errors'
import { encodeUserToken } from '@/lib/jwt'
import { compare } from '@/utils/hash'
import { loginSchema } from '@packages/auth/schema'
import { AuthUser } from '@packages/auth/types'
import { RequestHandler } from 'express'

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body)

    /**
     * Check credentials
     */
    const user = await db.user.findUnique({ where: { email: data.email } })
    if (!user) throw new UnauthorizedError('Invalid credentials')

    const passwordCorrect = await compare(data.password, user.password)
    if (!passwordCorrect) throw new UnauthorizedError('Invalid credentials')

    /**
     * Sign token
     */
    const { password, ...userWithoutPassword } = user
    const userForToken = {
      id: userWithoutPassword.id,
      email: userWithoutPassword.email,
    }

    const token = encodeUserToken(userForToken)

    res.status(201).json({
      message: 'Login successful',
      data: {
        user: userWithoutPassword satisfies AuthUser,
        token,
      },
    })
  } catch (err) {
    next(err)
  }
}
