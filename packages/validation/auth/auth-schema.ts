import { z } from 'zod'

export const registrationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})

export type RegistrationData = z.infer<typeof registrationSchema>

export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
})

export type LoginData = z.infer<typeof loginSchema>