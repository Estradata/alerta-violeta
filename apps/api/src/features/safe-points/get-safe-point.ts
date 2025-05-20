import { db } from '@/lib/db'
import { RequestHandler } from 'express'
import { NotFoundError } from '@packages/errors'
import type { GetSafePointResponse } from '@packages/safe-points/types'
import { ensureAuth } from '@/utils/ensure-auth'

export const getSafePoint: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    ensureAuth(req.admin.permissions, 'SAFE_POINTS', 'VIEW')

    const data = await db.safePoint.findUnique({
      where: {
        id: req.params.id,
      },
    })

    if (!data) throw new NotFoundError()

    res.json({ data } satisfies GetSafePointResponse)
  } catch (err) {
    next(err)
  }
}
