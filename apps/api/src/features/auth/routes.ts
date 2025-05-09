import express from 'express'
// import { registrationSchema, loginSchema } from '@packages/validation/auth/auth-schema';
import { registerUser, loginUser } from './controller'
const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)

export default authRouter
