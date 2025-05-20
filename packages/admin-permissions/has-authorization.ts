import { MODULE_PERMISSIONS_MAP } from './consts'
import type { PermissionAction, PermissionModule } from './schema'

type Permission = {
  module: PermissionModule
  action: PermissionAction // Only the highest allowed action is stored
}

/**
 * Checks whether an admin has sufficient permission to perform a specific action on a given module.
 *
 * @param context - The admin's permission context, which may include either role-based or custom permissions.
 * @param target - The module and action to be checked.
 * @returns `true` if the admin has sufficient permission, otherwise `false`.
 *
 * @example
 * const admin: AdminContext = {
 *   customPermissions: [
 *     { module: "user", action: "view" },
 *     { module: "post", action: "update" },
 *   ],
 * };
 *
 * hasAuthorization(admin, { module: "post", action: "view" });   // ✅ true
 * hasAuthorization(admin, { module: "post", action: "update" }); // ✅ true
 * hasAuthorization(admin, { module: "user", action: "update" }); // ❌ false
 * hasAuthorization(admin, { module: "invoice", action: "view" }); // ❌ false
 */
export function hasAuthorization(
  permissions: Permission[] | undefined,
  module: PermissionModule,
  action: PermissionAction = 'VIEW'
): boolean {
  if (!permissions) return false

  const modulePermissions = MODULE_PERMISSIONS_MAP[module]

  if (!modulePermissions.includes(action)) {
    // Invalid action for the module
    return false
  }

  const matched = permissions.find((perm) => perm.module === module)

  if (!matched) return false

  // Permission hierarchy: "update" > "view"
  const permissionOrder: PermissionAction[] = ['VIEW', 'UPDATE']

  const userLevel = permissionOrder.indexOf(matched.action)
  const requiredLevel = permissionOrder.indexOf(action)

  return userLevel >= requiredLevel
}
