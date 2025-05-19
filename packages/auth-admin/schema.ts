import { PermissionIdSchema } from '@packages/permissions/schema'
import { z } from 'zod'

/**
 * Create Admin Schema
 */
export const adminSchema = z
  .object({
    accountId: z.string(),
    name: z.string(),
    email: z.string().email('Ingresa un correo válido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),

    // Either a role...
    roleId: z.string().nullable().optional(),
    // ...or custom permissions IDS (but not both)
    customPermissions: z.array(PermissionIdSchema),
  })
  // Disallow having both roleId and customPermissions
  .refine(
    (data) => {
      const hasRole = Boolean(data.roleId)
      
      const hasCustomPermissions =
        Array.isArray(data.customPermissions) &&
        data.customPermissions.length > 0

      return !(hasRole && hasCustomPermissions)
    },
    {
      message:
        'No se puede asignar un rol y permisos personalizados al mismo tiempo.',
      path: ['customPermissions'],
    }
  )

export type AdminData = z.infer<typeof adminSchema>

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
