import { RequestHandler } from 'express'
import { db } from '@/lib/db'
import { DeleteSafePointsResponse } from '@packages/safe-points/types'
import { deleteSchema } from '@packages/misc/schema'
import { ensureAuth } from '@/utils/ensure-auth'

export const deleteSafePoints: RequestHandler = async (req, res, next) => {
  try {
    ensureAuth(req.admin.permissions, 'SAFE_POINTS', 'UPDATE')

    const ids = deleteSchema.parse(req.body)

    await db.safePoint.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })

    res.status(200).json({
      message: 'Punto(s) eliminado(s)',
    } satisfies DeleteSafePointsResponse)
  } catch (err) {
    next(err)
  }
}
