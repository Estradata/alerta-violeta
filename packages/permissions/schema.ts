import { z } from 'zod'

export const PermissionModuleEnum = z.enum(['USERS', 'ADMINS', 'SAFE_POINTS'])
export const PermissionActionEnum = z.enum(['VIEW', 'UPDATE'])

export type PermissionModule = z.infer<typeof PermissionModuleEnum>
export type PermissionAction = z.infer<typeof PermissionActionEnum>
export type PermissionId = `${PermissionModule}.${PermissionAction}`
