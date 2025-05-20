import { db } from '@/lib/db'
import { RequestHandler } from 'express'
import { GetUsersResponse } from '@packages/users/types'
import { ensureAuth } from '@/utils/ensure-auth'

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    ensureAuth(req.admin.permissions, 'USERS', 'VIEW')

    const users = await db.user.findMany()

    res.json({
      data: users.map((user) => {
        const [name, domain] = user.email.split('@')
        const email =
          name.charAt(0) + '*'.repeat(name.length - 1) + `@${domain}`

        return {
          id: user.id,
          email: email,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin,
          name: user.name,
          status: user.status,
        }
      }),
    } satisfies GetUsersResponse)
  } catch (err) {
    next(err)
  }
}
