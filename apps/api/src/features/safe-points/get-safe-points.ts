import { db } from '@/lib/db'
import { SafePoint } from '@packages/safe-points/types'
import { RequestHandler } from 'express'

export const getSafePoints: RequestHandler = async (_, res, next) => {
  try {
    const data = await db.safePoint.findMany()
    res.json({ data: data satisfies SafePoint[] })
  } catch (err) {
    next(err)
  }
}
