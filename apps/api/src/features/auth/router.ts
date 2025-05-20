import express from 'express'
import { registerUser } from '@/features/auth/register-user'
import { loginUser } from '@/features/auth/login-user'
import { verifyUserToken } from '@/features/auth/verify-user-token'

const authRouter = express.Router()

authRouter
  .post('/login', loginUser)
  .post('/verify', verifyUserToken)
  .post('/register', registerUser)

export default authRouter
