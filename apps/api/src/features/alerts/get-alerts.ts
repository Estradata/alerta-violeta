import { db } from '@/lib/db'
import { RequestHandler } from 'express'
import { GetAlertsResponse } from '@packages/alerts/types'

export const getAlerts: RequestHandler = async (req, res, next) => {
  try {
    const user = req.admin || req.user
    const data = await db.alert.findMany({
      where: {
        user: {
          accountId: user.accountId,
        },
      },
    })

    res.json({ data } satisfies GetAlertsResponse)
  } catch (err) {
    next(err)
  }
}
