// packages/validation/userSchema.ts
import { z } from 'zod'

export const publicUserSchema = z.object({
   id: z.string(),
   email: z.string().email(),
   name: z.string().nullable(),
})

export type PublicUser = z.infer<typeof publicUserSchema>
