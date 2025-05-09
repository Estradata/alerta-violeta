import express from 'express'
import {
  registrationSchema,
  loginSchema,
} from '@packages/validation/auth/auth-schema'
import { validationMiddleware } from '@/middlewares/validation-middleware'
import { registerUser } from '@/features/auth/register-user'
import { loginUser } from '@/features/auth/login-user'

const authRouter = express.Router()

authRouter
  .post('/register', validationMiddleware(registrationSchema), registerUser)
  .post('/login', validationMiddleware(loginSchema), loginUser)

export default authRouter
