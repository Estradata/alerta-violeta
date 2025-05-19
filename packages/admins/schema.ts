import { PermissionIdSchema } from '../permissions/schema'
import { z } from 'zod'

/**
 * Create Admin Schema
 */
export const adminSchema = z.object({
  name: z.string(),
  email: z.string().email('Ingresa un correo válido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),

  // Either a role...
  roleId: z.string().nullable().optional(),
  // ...or custom permissions IDS (but not both)
  customPermissions: z.array(PermissionIdSchema),
})

export type AdminData = z.infer<typeof adminSchema>
