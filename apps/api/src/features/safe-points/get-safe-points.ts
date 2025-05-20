import { db } from '@/lib/db'
import { RequestHandler } from 'express'
import type { GetSafePointsResponse } from '@packages/safe-points/types'

export const getSafePoints: RequestHandler = async (req, res, next) => {
  try {
    const user = req.admin || req.user

    const data = await db.safePoint.findMany({
      where: {
        accountId: user.accountId,
      },
    })

    res.json({ data } satisfies GetSafePointsResponse)
  } catch (err) {
    next(err)
  }
}
