import { z } from 'zod'

export const safePointSchema = z.object({
  accountId: z.string(),
  name: z.string(),
  address: z.string(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
  type: z.enum(['ONG', 'PUBLIC', 'PRIVATE']),
})

export type SafePointData = z.infer<typeof safePointSchema>
