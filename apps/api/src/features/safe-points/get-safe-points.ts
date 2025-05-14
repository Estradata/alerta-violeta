import { db } from '@/lib/db'
import type { GetSafePointsResponse } from '@packages/safe-points/types'
import { RequestHandler } from 'express'

export const getSafePoints: RequestHandler = async (_, res, next) => {
  try {
    const data = await db.safePoint.findMany()
    res.json({ data } satisfies GetSafePointsResponse)
  } catch (err) {
    next(err)
  }
}
