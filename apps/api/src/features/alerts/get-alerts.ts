import { db } from '@/lib/db'
import { RequestHandler } from 'express'
import { GetAlertsResponse } from '@packages/alerts/types'

export const getAlerts: RequestHandler = async (_, res, next) => {
  try {
    const data = await db.alert.findMany()

    res.json({ data } satisfies GetAlertsResponse)
  } catch (err) {
    next(err)
  }
}
