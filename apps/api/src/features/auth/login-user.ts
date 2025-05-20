import { db } from '@/lib/db'
import { CredentialsError, UnauthorizedError } from '@packages/errors'
import { encodeUserToken } from '@/lib/jwt'
import { compare } from '@/utils/hash'
import { loginSchema } from '@packages/auth/schema'
import { LoginResponse } from '@packages/auth/types'
import { RequestHandler } from 'express'

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body)

    /**
     * Check credentials
     */
    const user = await db.user.findUnique({ where: { email: data.email } })
    if (!user) throw new CredentialsError()

    if (user.status === 'BLOCKED')
      throw new UnauthorizedError('Esta cuenta se encuentra bloqueada')

    const passwordCorrect = await compare(data.password, user.password)
    if (!passwordCorrect) throw new CredentialsError()

    /**
     * Sign token
     */
    const { password, ...userWithoutPassword } = user
    const userForToken = {
      id: userWithoutPassword.id,
      email: userWithoutPassword.email,
    }

    const token = encodeUserToken(userForToken)

    /**
     * Update last login
     */
    await db.user.update({
      where: { id: user.id },
      data: {
        lastLogin: new Date(),
      },
    })

    res.status(201).json({
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token,
      },
    } satisfies LoginResponse)
  } catch (err) {
    next(err)
  }
}
