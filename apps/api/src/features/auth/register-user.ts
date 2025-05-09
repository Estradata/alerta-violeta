import { checkIsEmailAvailable } from '@/features/auth/utils'
import { db } from '@/lib/db'
import { ValidationError } from '@/lib/errors'
import { hash } from '@/utils/hash'
import { RegistrationData } from '@packages/auth/schema'
import { AuthUser } from '@packages/auth/types'
import { RequestHandler } from 'express'

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body as RegistrationData

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
    const newUser = await db.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    })

    res.json({
      message: 'User registration successful',
      data: newUser satisfies AuthUser,
    })
  } catch (err) {
    next(err)
  }
}
