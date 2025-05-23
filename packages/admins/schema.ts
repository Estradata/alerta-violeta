import { PermissionIdSchema } from '../admin-permissions/schema'
import { z } from 'zod'

/**
 * Create Admin Schema
 */
export const adminSchema = z
  .object({
    id: z.string().optional().nullable(),
    name: z.string().min(2, 'Ingresa mínimo 2 caracteres'),
    email: z.string().email('Ingresa un correo válido'),
    changePassword: z.boolean().optional().nullable(),
    password: z.string(),
    confirmPassword: z.string(),

    // Either a role...
    roleId: z.string().nullable().optional(),
    // ...or custom permissions IDS (but not both)
    customPermissions: z.array(PermissionIdSchema),
  })
  .superRefine(({ confirmPassword, password, changePassword }, ctx) => {
    if (changePassword && password.length < 8) {
      ctx.addIssue({
        code: 'custom',
        message: 'Ingresa mínimo 8 caracteres',
        path: ['password'],
      })
    }

    if (changePassword && confirmPassword.length < 6) {
      ctx.addIssue({
        code: 'custom',
        message: 'Ingresa mínimo 8 caracteres',
        path: ['confirmPassword'],
      })
    }

    if (changePassword && confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'La contraseña no es igual',
        path: ['confirmPassword'],
      })
    }
  })

export type AdminData = z.infer<typeof adminSchema>
