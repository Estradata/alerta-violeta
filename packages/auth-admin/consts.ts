import type { PermissionAction, PermissionModule } from './schema'

export const MODULE_PERMISSIONS_MAP: Record<
  PermissionModule,
  PermissionAction[]
> = {
  ADMINS: ['VIEW', 'UPDATE'],
  SAFE_POINTS: ['VIEW', 'UPDATE'],
  USERS: ['VIEW', 'UPDATE'],
}

export const MODULE_PERMISSIONS_LABELS: Record<PermissionModule, string> = {
  ADMINS: 'Administradores',
  SAFE_POINTS: 'Puntos Violeta',
  USERS: 'Usuarios',
}
