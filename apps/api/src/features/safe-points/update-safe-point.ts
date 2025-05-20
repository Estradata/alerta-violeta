import { RequestHandler } from 'express'
import { safePointSchema } from '@packages/safe-points/schema'
import { db } from '@/lib/db'
import type { UpdateSafePointResponse } from '@packages/safe-points/types'
import { ensureAuth } from '@/utils/ensure-auth'

export const updateSafePoint: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    ensureAuth(req.admin.permissions, 'SAFE_POINTS', 'UPDATE')

    const id = req.params.id
    const data = safePointSchema.parse(req.body)
    const safePoint = await db.safePoint.update({
      where: { id },
      data,
    })

    res.json({
      message: 'Punto actualizado correctamente',
      data: safePoint,
    } satisfies UpdateSafePointResponse)
  } catch (err) {
    next(err)
  }
}
