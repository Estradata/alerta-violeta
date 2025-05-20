import { loginAdmin } from '@/features/auth-admin/login-admin'
import { verifyAdminToken } from '@/features/auth-admin/verify-admin-token'
import express from 'express'

const authRouter = express.Router()

authRouter
  .post('/login', loginAdmin)
  .post('/verify', verifyAdminToken)

export default authRouter
