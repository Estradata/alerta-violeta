import { hash } from '@/utils/hash'
import {
  LoginData,
  RegistrationData,
} from '@packages/validation/auth/auth-schema'
import { db } from '@/lib/db'
import { NextFunction, Request, Response } from 'express'
import { checkIsEmailAvailable } from '@/features/auth/utils'
import { ValidationError } from '@/lib/errors'

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body as RegistrationData
    const available = checkIsEmailAvailable(data.email)

    if (!available)
      throw new ValidationError({
        email: 'Email not available',
      })

    const hashedPassword = await hash(data.password)
    const newUser = await db.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    })

    res.json({
      message: 'User registration successful',
      user: newUser,
    })
  } catch (err) {
    next(err)
  }
}

export const loginUser = (req: Request, res: Response) => {
  // Handle user login logic using validated data from req.body
  const body = req.body as LoginData
  console.log(body)
  res.json({ message: 'User logged in successfully', data: req.body })
}
