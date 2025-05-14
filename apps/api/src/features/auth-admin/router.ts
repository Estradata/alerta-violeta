import { loginAdmin } from '@/features/auth-admin/login-admin'
import { registerAdmin } from '@/features/auth-admin/register-admin'
import { verifyAdminToken } from '@/features/auth-admin/verify-admin-token'
import express from 'express'

const authRouter = express.Router()

authRouter
  .post('/register', registerAdmin)
  .post('/verify', verifyAdminToken)
  .post('/login', loginAdmin)

export default authRouter
