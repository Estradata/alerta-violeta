import { z } from 'zod'

export const PermissionModuleEnum = z.enum(['USERS', 'ADMINS', 'SAFE_POINTS'])
export const PermissionActionEnum = z.enum(['VIEW', 'UPDATE'])

/**
 * Only Valid ${Module}.${Action} IDS
 */
const validPermissionIds = new Set(
  PermissionModuleEnum.options.flatMap((module) =>
    PermissionActionEnum.options.map((action) => `${module}.${action}`)
  )
)
export const PermissionIdSchema = z
  .string()
  .refine((val) => validPermissionIds.has(val), {
    message: 'Invalid PermissionId',
  })

export type PermissionModule = z.infer<typeof PermissionModuleEnum>
export type PermissionAction = z.infer<typeof PermissionActionEnum>
export type PermissionId = `${PermissionModule}.${PermissionAction}`
