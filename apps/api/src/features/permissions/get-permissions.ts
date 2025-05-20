import { db } from '@/lib/db'
import { RequestHandler } from 'express'
import { GetPermissionsResponse } from '@packages/admin-permissions/types'
import { PermissionId } from '@packages/admin-permissions/schema'

export const getPermissions: RequestHandler = async (_, res, next) => {
  try {
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
