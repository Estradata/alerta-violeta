import { LoginData, RegistrationData } from '@packages/validation/auth/auth-schema'
import { Request, Response } from 'express'

// TODO: make some library/wrapper to automatically infer type of req.body after middleware
export const registerUser = (req: Request, res: Response) => {
  const body = req.body as RegistrationData
  console.log(body)
  res.json({ message: 'User registered successfully', data: req.body })
}

export const loginUser = (req: Request, res: Response) => {
  // Handle user login logic using validated data from req.body
  const body = req.body as LoginData
  console.log(body)
  res.json({ message: 'User logged in successfully', data: req.body })
}
