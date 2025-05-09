import express from 'express'
import { registrationSchema, loginSchema } from '@packages/validation/auth/auth-schema';
import { registerUser, loginUser } from './controller'
import { validationMiddleware } from '@/middlewares/validation-middleware';
const authRouter = express.Router()

authRouter.post('/register', validationMiddleware(registrationSchema), registerUser)
authRouter.post('/login', validationMiddleware(loginSchema), loginUser)

export default authRouter
