import { updateUserStatusSchema } from '@packages/users/schema'
import { db } from '@/lib/db'
import { RequestHandler } from 'express'
import type { UpdateUserStatusResponse } from '@packages/users/types'
import { ensureAuth } from '@/utils/ensure-auth'

export const updateUserStatus: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    ensureAuth(req.admin.permissions, 'USERS', 'UPDATE')

    const id = req.params.id
    const { status } = updateUserStatusSchema.parse(req.body)

    await db.user.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })

    res.json({
      message: 'Estatus actualizado correctamente',
    } satisfies UpdateUserStatusResponse)
  } catch (err) {
    next(err)
  }
}
