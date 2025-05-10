import { z } from 'zod'

export const safePointSchema = z.object({
  accountId: z.string(),
  name: z.string(),
  address: z.string(),
  lat: z.number(),
  lng: z.number(),
  type: z.enum(['ONG', 'PUBLIC', 'PRIVATE']),
})

export type SafePointData = z.infer<typeof safePointSchema>
