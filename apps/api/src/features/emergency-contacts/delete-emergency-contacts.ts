import { RequestHandler } from 'express'
import { db } from '@/lib/db'
import { deleteSchema } from '@packages/misc/schema'
import type { DeleteEmergencyContactsResponse } from '@packages/emergency-contacts/types'

export const deleteEmergencyContacts: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const ids = deleteSchema.parse(req.body)

    await db.emergencyContact.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })

    res.status(200).json({
      message: 'Contacto(s) eliminado(s)',
    } satisfies DeleteEmergencyContactsResponse)
  } catch (err) {
    next(err)
  }
}
