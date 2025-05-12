import { checkIsEmailAvailable } from '@/features/auth/utils'
import { db } from '@/lib/db'
import { ValidationError } from '@packages/errors'
import { encodeUserToken } from '@/lib/jwt'
import { hash } from '@/utils/hash'
import { registrationSchema } from '@packages/auth/schema'
import { LoginResponse } from '@packages/auth/types'
import { RequestHandler } from 'express'

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const data = registrationSchema.parse(req.body)

    /**
     * Check email available
     */
    const available = await checkIsEmailAvailable(data.email)
    if (!available)
      throw new ValidationError({
        email: 'Este correo no está disponible',
      })

    /**
     * Check account
     */
    const account = await db.account.findUnique({
      where: { id: data.accountId },
    })

    if (!account)
      throw new ValidationError({
        accountId: 'La cuenta no existe',
      })

    /**
     * Create user
     */
    const hashedPassword = await hash(data.password)
    const { password, ...user } = await db.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    })

    const userForToken = {
      id: user.id,
      email: user.email,
    }

    const token = encodeUserToken(userForToken)

    res.json({
      message: 'User registration successful',
      data: {
        user,
        token,
      },
    } satisfies LoginResponse)
  } catch (err) {
    next(err)
  }
}
