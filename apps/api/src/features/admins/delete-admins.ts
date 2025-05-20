import { RequestHandler } from 'express'
import { db } from '@/lib/db'
import { DeleteAdminsResponse } from '@packages/admins/types'
import { deleteSchema } from '@packages/misc/schema'
import { ensureAuth } from '@/utils/ensure-auth'

export const deleteAdmins: RequestHandler = async (req, res, next) => {
  try {
    ensureAuth(req.admin.permissions, 'ADMINS', 'UPDATE')

    const ids = deleteSchema.parse(req.body)

    await db.admin.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })

    res.status(200).json({
      message: 'Admin(s) eliminado(s)',
    } satisfies DeleteAdminsResponse)
  } catch (err) {
    next(err)
  }
}
