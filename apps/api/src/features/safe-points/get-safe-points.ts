import { db } from '@/lib/db'
import { ensureAuth } from '@/utils/ensure-auth'
import type { GetSafePointsResponse } from '@packages/safe-points/types'
import { RequestHandler } from 'express'

export const getSafePoints: RequestHandler = async (req, res, next) => {
  try {
    ensureAuth(req.admin.permissions, 'SAFE_POINTS', 'VIEW')
    const data = await db.safePoint.findMany()
    res.json({ data } satisfies GetSafePointsResponse)
  } catch (err) {
    next(err)
  }
}
