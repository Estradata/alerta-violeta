import { RequestHandler } from 'express'
import { db } from '@/lib/db'
import { DeleteSafePointsResponse } from '@packages/safe-points/types'
import { deleteSchema } from '@packages/misc/schema'

export const deleteSafePoints: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
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
