import express from 'express'
import { registerUser } from '@/features/auth/register-user'
import { loginUser } from '@/features/auth/login-user'
import { verifyUserToken } from '@/features/auth/verify-user-token'

const authRouter = express.Router()

authRouter
  .post('/register', registerUser)
  .post('/verify', verifyUserToken)
  .post('/login', loginUser)

export default authRouter
