import { z } from 'zod'

/**
 * Create / Update Data
 */
export const emergencyContactSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  phone: z.string(),
  description: z.string(),
})

export type EmergencyContactData = z.infer<typeof emergencyContactSchema>
