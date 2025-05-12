import {
  POLICIES,
  type RolesWithPermissions,
  type Permissions,
  type Resource,
} from './policies'
import type { AuthUser } from './types'
import { UnauthorizedError } from '../errors/index'

export function checkAuthorization<R extends Resource>(
  user: AuthUser,
  resource: R,
  action: Permissions[R]['action'],
  data?: Permissions[R]['dataType']
): boolean {
  if (!user) return false

  const role = user.role
  const permission = (POLICIES as RolesWithPermissions)[role][resource]?.[
    action
  ]

  if (permission == null) return false

  if (typeof permission === 'boolean') return permission
  return data != null && permission(user, data)
}

export function ensureAuthorization<R extends Resource>(
  user: AuthUser,
  resource: R,
  action: Permissions[R]['action'],
  data?: Permissions[R]['dataType']
): void {
  if (!checkAuthorization(user, resource, action, data))
    throw new UnauthorizedError()
}
