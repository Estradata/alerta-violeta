import { z } from 'zod'

/**
 * Create / Update Data
 */
export const safePointSchema = z.object({
  id: z.string().optional(),

  name: z.string(),
  address: z.string(),
  googlePlaceId: z.string().optional().nullable(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),

  // TODO: PUNTO_VIOLETA
  // SAFE_POINT
  // VER COMO OBTENER LA CALLE ETC DADA UNA LAT Y LNG
  type: z.enum(['ONG', 'PUBLIC', 'PRIVATE']),
})

export type SafePointData = z.infer<typeof safePointSchema>
