import { MODULE_PERMISSIONS_MAP } from './consts'
import type { PermissionAction, PermissionModule } from '../permissions/schema'

type Permission = {
  module: PermissionModule
  action: PermissionAction // Only the highest allowed action is stored
}

type AdminContext = {
  rolePermissions?: Permission[] // Permisos del rol
  customPermissions?: Permission[] // Permisos individuales
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
 * hasPermission(admin, { module: "post", action: "view" });   // ✅ true
 * hasPermission(admin, { module: "post", action: "update" }); // ✅ true
 * hasPermission(admin, { module: "user", action: "update" }); // ❌ false
 * hasPermission(admin, { module: "invoice", action: "view" }); // ❌ false
 */
export function hasPermission(
  context: {
    rolePermissions?: Permission[]
    customPermissions?: Permission[]
  },
  target: { module: PermissionModule; action: PermissionAction }
): boolean {
  const { rolePermissions, customPermissions } = context

  const sourcePermissions = customPermissions?.length
    ? customPermissions
    : (rolePermissions ?? [])

  const modulePermissions = MODULE_PERMISSIONS_MAP[target.module]

  if (!modulePermissions.includes(target.action)) {
    // Invalid action for the module
    return false
  }

  const matched = sourcePermissions.find(
    (perm) => perm.module === target.module
  )

  if (!matched) return false

  // Permission hierarchy: "update" > "view"
  const permissionOrder: PermissionAction[] = ['VIEW', 'UPDATE']

  const userLevel = permissionOrder.indexOf(matched.action)
  const requiredLevel = permissionOrder.indexOf(target.action)

  return userLevel >= requiredLevel
}
