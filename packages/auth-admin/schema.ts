import {
  PermissionActionEnum,
  PermissionModuleEnum,
} from '@packages/permissions/schema'
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
    roleId: z.string().uuid().nullable().optional(),

    // ...or custom permissions (but not both)
    customPermissions: z
      .array(
        z.object({
          module: PermissionModuleEnum,
          action: PermissionActionEnum,
        })
      )
      .optional(),
  })
  // Disallow having both roleId and customPermissions
  .refine(
    (data) => {
      const hasRole = !!data.roleId
      const hasCustomPermissions =
        Array.isArray(data.customPermissions) &&
        data.customPermissions.length > 0
      return !(hasRole && hasCustomPermissions)
    },
    {
      message:
        'Cannot assign both a role and custom permissions at the same time.',
      path: ['customPermissions'],
    }
  )
  // Ensure each module appears only once in customPermissions
  .superRefine((data, ctx) => {
    if (data.customPermissions) {
      const seen = new Set<string>()
      for (const perm of data.customPermissions) {
        if (seen.has(perm.module)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Duplicate permission for module '${perm.module}'`,
            path: ['customPermissions'],
          })
        } else {
          seen.add(perm.module)
        }
      }
    }
  })

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
