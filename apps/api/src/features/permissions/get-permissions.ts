import { db } from '@/lib/db'
import { RequestHandler } from 'express'
import { GetPermissionsResponse } from '@packages/admin-permissions/types'
import { PermissionId } from '@packages/admin-permissions/schema'
import { ensureAuth } from '@/utils/ensure-auth'

export const getPermissions: RequestHandler = async (req, res, next) => {
  try {
    ensureAuth(req.admin.permissions, 'ADMINS', 'UPDATE')
    const permissions = await db.permission.findMany()

    res.json({
      data: permissions.map((p) => {
        return {
          ...p,
          id: p.id as PermissionId,
        }
      }),
    } satisfies GetPermissionsResponse)
  } catch (err) {
    next(err)
  }
}
