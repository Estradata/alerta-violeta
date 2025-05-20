import { RequestHandler } from 'express'
import { safePointSchema } from '@packages/safe-points/schema'
import { db } from '@/lib/db'
import type { CreateSafePointResponse } from '@packages/safe-points/types'
import { ensureAuth } from '@/utils/ensure-auth'

export const createSafePoint: RequestHandler = async (req, res, next) => {
  try {
    ensureAuth(req.admin.permissions, 'SAFE_POINTS', 'UPDATE')

    const data = safePointSchema.parse(req.body)

    const safePoint = await db.safePoint.create({
      data: {
        ...data,
        accountId: req.admin.accountId,
      },
    })

    res.json({
      message: 'Punto creado correctamente',
      data: safePoint,
    } satisfies CreateSafePointResponse)
  } catch (err) {
    next(err)
  }
}
