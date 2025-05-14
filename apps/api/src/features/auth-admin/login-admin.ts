import { db } from '@/lib/db'
import { CredentialsError } from '@packages/errors'
import { encodeAdminToken } from '@/lib/jwt'
import { compare } from '@/utils/hash'
import { loginSchema } from '@packages/auth-admin/schema'
import { LoginResponse } from '@packages/auth-admin/types'
import { RequestHandler } from 'express'

export const loginAdmin: RequestHandler = async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body)

    /**
     * Check credentials
     */
    const admin = await db.admin.findUnique({ where: { email: data.email } })
    if (!admin) throw new CredentialsError()

    const passwordCorrect = await compare(data.password, admin.password)
    if (!passwordCorrect) throw new CredentialsError()

    /**
     * Sign token
     */
    const { password, ...userWithoutPassword } = admin
    const userForToken = {
      id: userWithoutPassword.id,
      email: userWithoutPassword.email,
    }

    const token = encodeAdminToken(userForToken)

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
