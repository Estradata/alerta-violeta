import { db } from '@/lib/db'
import type { GetEmergencyContactsResponse } from '@packages/emergency-contacts/types'
import { RequestHandler } from 'express'

export const getEmergencyContacts: RequestHandler = async (_, res, next) => {
  try {
    const data = await db.emergencyContact.findMany()
    res.json({ data } satisfies GetEmergencyContactsResponse)
  } catch (err) {
    next(err)
  }
}
