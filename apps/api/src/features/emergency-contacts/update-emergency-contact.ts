import type { UpdateEmergencyContactResponse } from '@packages/emergency-contacts/types'
import { RequestHandler } from 'express'
import { emergencyContactSchema } from '@packages/emergency-contacts/schema'
import { db } from '@/lib/db'

export const updateEmergencyContact: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id
    const data = emergencyContactSchema.parse(req.body)
    const emergencyContact = await db.emergencyContact.update({
      where: { id },
      data,
    })

    res.json({
      message: 'Contacto actualizado correctamente',
      data: emergencyContact,
    } satisfies UpdateEmergencyContactResponse)
  } catch (err) {
    next(err)
  }
}
