import { db } from '@/lib/db'
import { RequestHandler } from 'express'
import { NotFoundError } from '@packages/errors'
import type { GetEmergencyContactResponse } from '@packages/emergency-contacts/types'

export const getEmergencyContact: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const data = await db.emergencyContact.findUnique({
      where: {
        id: req.params.id,
      },
    })

    if (!data) throw new NotFoundError()

    res.json({ data } satisfies GetEmergencyContactResponse)
  } catch (err) {
    next(err)
  }
}
