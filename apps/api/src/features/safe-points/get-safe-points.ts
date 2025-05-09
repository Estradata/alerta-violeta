import { db } from '@/lib/db'
import { RequestHandler } from 'express'
import { SafePoint } from '@packages/types/safe-points'

type GetSafePointsResponse = {
  data: SafePoint[]
}

export const getSafePoints: RequestHandler<
  // ReqParams = {}
  {},
  // ResBody = GetSafePointsResponse
  GetSafePointsResponse
> = async (req, res, next) => {
  try {
    const data = await db.safePoint.findMany()
    res.json({ data })
  } catch (err) {
    next(err)
  }
}
