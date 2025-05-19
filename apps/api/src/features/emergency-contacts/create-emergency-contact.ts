import { RequestHandler } from 'express'
import { db } from '@/lib/db'
import { emergencyContactSchema } from '@packages/emergency-contacts/schema'
import type { CreateEmergencyContactResponse } from '@packages/emergency-contacts/types'

export const createEmergencyContact: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const data = emergencyContactSchema.parse(req.body)

    const emergencyContact = await db.emergencyContact.create({
      data: {
        ...data,
        accountId: req.admin.accountId
      },
    })

    res.json({
      message: 'Contacto creado correctamente',
      data: emergencyContact,
    } satisfies CreateEmergencyContactResponse)
  } catch (err) {
    next(err)
  }
}
