import express from 'express'
import { registrationSchema, loginSchema } from '@packages/auth/schema'
import { validationMiddleware } from '@/middlewares/validation-middleware'
import { registerUser } from '@/features/auth/register-user'
import { loginUser } from '@/features/auth/login-user'
import { verifyUserToken } from '@/features/auth/verify-user-token'

const authRouter = express.Router()

authRouter
  .post('/register', validationMiddleware(registrationSchema), registerUser)
  .post('/verify', verifyUserToken)
  .post('/login', validationMiddleware(loginSchema), loginUser)

export default authRouter
