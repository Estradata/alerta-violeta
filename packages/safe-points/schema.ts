import { z } from 'zod'

/**
 * Create / Update Data
 */
export const safePointSchema = z.object({
  id: z.string().optional(),
  accountId: z.string(),

  name: z.string(),
  address: z.string(),
  googlePlaceId: z.string().optional().nullable(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),

  type: z.enum(['ONG', 'PUBLIC', 'PRIVATE']),
})

export type SafePointData = z.infer<typeof safePointSchema>
