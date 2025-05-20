import { RequestHandler } from 'express'
import { db } from '@/lib/db'
import { DeleteAdminsResponse } from '@packages/admins/types'
import { deleteSchema } from '@packages/misc/schema'

export const deleteAdmins: RequestHandler = async (req, res, next) => {
  try {
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
