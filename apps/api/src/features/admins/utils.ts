import { db } from '@/lib/db'
import type { Permission } from '@packages/admin-permissions/types'
import {
  Admin,
  AdminRole,
  type Permission as PermissionDB,
} from '@prisma/client'

export async function checkIsAdminEmailTaken(
  email: string
): Promise<Admin | null> {
  const admin = await db.admin.findFirst({
    where: {
      email,
    },
  })

  return admin
}

/**
 * Use in CREATE or UPDATE
 */
export async function getRoleAndPermissions(data: {
  roleId?: string | null
  customPermissions: string[]
}): Promise<{
  roleId: string | null
  role: AdminRole | null
  customPermissions: Array<{ id: string }>
}> {
  let role: AdminRole | null = null
  let customPermissions: Array<{ id: string }> = []

  if (data.roleId && data.roleId !== 'NONE') {
    role = await db.adminRole.findUnique({ where: { id: data.roleId } })
  } else if (data.customPermissions.length) {
    customPermissions = data.customPermissions.map((id) => ({ id }))
  }

  return { roleId: role?.id || null, role, customPermissions }
}

/**
 * Used in admin-extractor-middleware, login and verify
 */
export function getAdminPermissions(admin: {
  role: { permissions: PermissionDB[] } | null
  customPermissions: PermissionDB[]
}) {
  let permissions: Permission[] = []

  if (admin.role?.permissions) {
    permissions = admin.role.permissions as Permission[]
  } else {
    permissions = admin.customPermissions as Permission[]
  }

  return permissions
}
