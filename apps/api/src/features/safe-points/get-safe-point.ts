import { db } from '@/lib/db'
import { RequestHandler } from 'express'
import { NotFoundError } from '@/lib/errors'
import type { GetSafePointResponse } from '@packages/safe-points/types'

export const getSafePoint: RequestHandler<{ userId: string }> = async (
  req,
  res,
  next
) => {
  try {
    const data = await db.safePoint.findUnique({
      where: {
        id: req.params.userId,
      },
    })

    if (!data) throw new NotFoundError()

    res.json({ data } satisfies GetSafePointResponse)
  } catch (err) {
    next(err)
  }
}
