import express from 'express'
import userExtractor from '@/middlewares/user-extractor-middleware'
import { getEmergencyContacts } from '@/features/emergency-contacts/get-emergency-contacts'
import { getEmergencyContact } from '@/features/emergency-contacts/get-emergency-contact'
import { createEmergencyContact } from '@/features/emergency-contacts/create-emergency-contact'
import { updateEmergencyContact } from '@/features/emergency-contacts/update-emergency-contact'
import { deleteEmergencyContacts } from '@/features/emergency-contacts/delete-emergency-contacts'

const router = express.Router()

router
  .use(userExtractor)
  .get('/', getEmergencyContacts)
  .get('/:id', getEmergencyContact)
  .post('/', createEmergencyContact)
  .put('/:id', updateEmergencyContact)
  .delete('/', deleteEmergencyContacts)

export default router
