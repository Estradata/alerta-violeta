import { z } from 'zod'

/***
 * Login Schema
 */
export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres.'),
})

export type LoginData = z.infer<typeof loginSchema>
