import { db } from '@/lib/db'
import type { GetEmergencyContactsResponse } from '@packages/emergency-contacts/types'
import { RequestHandler } from 'express'

export const getEmergencyContacts: RequestHandler = async (req, res, next) => {
  try {
    const user = req.admin || req.user
    const data = await db.emergencyContact.findMany({
      where: {
        accountId: user.accountId,
      },
    })
    res.json({ data } satisfies GetEmergencyContactsResponse)
  } catch (err) {
    next(err)
  }
}
