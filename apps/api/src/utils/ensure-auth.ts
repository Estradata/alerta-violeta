import { hasAuthorization } from '@packages/admin-permissions/has-authorization'
import type {
  PermissionAction,
  PermissionModule,
} from '@packages/admin-permissions/schema'
import type { Permission } from '@packages/admin-permissions/types'
import { UnauthorizedError } from '@packages/errors'

export function ensureAuth(
  permissions: Permission[] | undefined,
  module: PermissionModule,
  action: PermissionAction = 'VIEW'
) {
  if (!hasAuthorization(permissions, module, action)) {
    throw new UnauthorizedError()
  }
}
