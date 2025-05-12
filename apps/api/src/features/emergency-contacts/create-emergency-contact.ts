import { RequestHandler } from 'express'
import { db } from '@/lib/db'
import { emergencyContactSchema } from '@packages/emergency-contacts/schema'
import type { CreateEmergencyContactResponse } from '@packages/emergency-contacts/types'
import { ensureAuthorization } from '@packages/auth/guards';

export const createEmergencyContact: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    ensureAuthorization(req.user, 'emergency-contacts', 'create')

    const data = emergencyContactSchema.parse(req.body)

    const emergencyContact = await db.emergencyContact.create({
      data,
    })

    res.json({
      message: 'Contacto creado correctamente',
      data: emergencyContact,
    } satisfies CreateEmergencyContactResponse)
  } catch (err) {
    next(err)
  }
}
