import { z } from 'zod'

export const updateUserStatusSchema = z.object({
  id: z.string(),
  status: z.enum(['ACTIVE', 'BLOCKED']),
})

export type UpdateUserStatusData = z.infer<typeof updateUserStatusSchema>
