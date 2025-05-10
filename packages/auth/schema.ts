import { z } from 'zod'

export const registrationSchema = z.object({
  accountId: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})

export type RegistrationData = z.infer<typeof registrationSchema>

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type LoginData = z.infer<typeof loginSchema>
