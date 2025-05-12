import { RequestHandler } from 'express'
import { safePointSchema } from '@packages/safe-points/schema'
import { db } from '@/lib/db'
import { SafePoint } from '@packages/safe-points/types'

export const createSafePoint: RequestHandler = async (req, res, next) => {
  try {
    const data = safePointSchema.parse(req.body)

    const safePoint = await db.safePoint.create({
      data,
    })

    res.json({
      message: 'Punto creado correctamente',
      data: safePoint satisfies SafePoint,
    })
  } catch (err) {
    next(err)
  }
}
