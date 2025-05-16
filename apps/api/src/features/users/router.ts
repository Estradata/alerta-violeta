import express from 'express'
import { getUsers } from '@/features/users/get-users'
import { updateUserStatus } from '@/features/users/update-user-status'

const usersRouter = express.Router()

usersRouter
  .get('/', getUsers)
  .post('/update-status/:id', updateUserStatus)

export default usersRouter
