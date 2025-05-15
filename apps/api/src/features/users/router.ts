import express from 'express'
import { getUsers } from '@/features/users/get-users'

const usersRouter = express.Router()

usersRouter
  .get('/', getUsers)

export default usersRouter
