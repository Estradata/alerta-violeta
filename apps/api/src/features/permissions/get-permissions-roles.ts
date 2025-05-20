import { db } from '@/lib/db'
import { RequestHandler } from 'express'
import { GetPermissionsRoles } from '@packages/admin-permissions/types'
import { PermissionId } from '@packages/admin-permissions/schema'

export const getPermissionsRoles: RequestHandler = async (_, res, next) => {
  try {
    const roles = await db.adminRole.findMany({
      include: {
        permissions: {
          select: {
            id: true,
          },
        },
      },
    })

    res.json({
      data: roles.map((role) => {
        return {
          id: role.id,
          name: role.name,
          permissionIds: role.permissions.map((p) => p.id as PermissionId),
        }
      }),
    } satisfies GetPermissionsRoles)
  } catch (err) {
    next(err)
  }
}
