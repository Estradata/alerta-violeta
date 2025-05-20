import { db } from '@/lib/db'
import { RequestHandler } from 'express'
import { GetAdminsResponse } from '@packages/admins/types'
import { PermissionId } from '@packages/admin-permissions/schema'
import { ensureAuth } from '@/utils/ensure-auth'

export const getAdmins: RequestHandler = async (req, res, next) => {
  try {
    ensureAuth(req.admin.permissions, 'ADMINS', 'VIEW')

    const admins = await db.admin.findMany({
      where: {
        accountId: req.admin.accountId,
      },
      include: {
        customPermissions: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.json({
      data: admins.map((admin) => {
        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          roleId: admin.roleId,
          permissions: admin.customPermissions.map((p) => p.id as PermissionId),
        }
      }),
    } satisfies GetAdminsResponse)
  } catch (err) {
    next(err)
  }
}
