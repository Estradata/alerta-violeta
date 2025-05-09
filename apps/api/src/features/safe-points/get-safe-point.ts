import { db } from '@/lib/db'
import { RequestHandler } from 'express'
import { SafePoint } from '@packages/types/safe-points'
import { NotFoundError } from '@/lib/errors'

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

    res.json({ data: data satisfies SafePoint })
  } catch (err) {
    next(err)
  }
}
