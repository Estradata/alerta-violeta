import express from 'express'
import { createAdmin } from '@/features/admins/create-admin'
import { getAdmins } from '@/features/admins/get-admins'
import { deleteAdmins } from '@/features/admins/delete-admins'
import { updateAdmin } from '@/features/admins/update-admin'

const adminsRouter = express.Router()

adminsRouter
  .get('/', getAdmins)
  .post('/', createAdmin)
  .put('/:id', updateAdmin)
  .delete('/', deleteAdmins)

export default adminsRouter
