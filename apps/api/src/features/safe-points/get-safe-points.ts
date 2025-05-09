import { db } from '@/lib/db'
import { RequestHandler } from 'express'
import { SafePoint } from '@packages/types/safe-points'

export const getSafePoints: RequestHandler = async (req, res, next) => {
  try {
    const data = await db.safePoint.findMany()
    res.json({ data: data satisfies SafePoint[] })
  } catch (err) {
    next(err)
  }
}
