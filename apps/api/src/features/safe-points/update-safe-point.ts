import { RequestHandler } from 'express'
import { safePointSchema } from '@packages/safe-points/schema'
import { db } from '@/lib/db'
import { SafePoint } from '@packages/safe-points/types'

export const updateSafePoint: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id
    const { accountId, ...data } = safePointSchema.parse(req.body)
    const safePoint = await db.safePoint.update({
      where: { id },
      data,
    })

    res.json({
      message: 'Punto actualizado correctamente',
      data: safePoint satisfies SafePoint,
    })
  } catch (err) {
    next(err)
  }
}
