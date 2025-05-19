import { RequestHandler } from 'express'
import { MODULE_PERMISSIONS_MAP } from '@packages/auth-admin/consts'
import { Permission, PermissionAction, PermissionModule } from '@prisma/client'
import { db } from '@/lib/db'
import { PermissionId } from '@packages/permissions/schema'

export const seedDB: RequestHandler = async (_, res) => {
  const data: Permission[] = []

  Object.entries(MODULE_PERMISSIONS_MAP).forEach(([m, actions]) => {
    const _module = m as PermissionModule

    actions.forEach((a) => {
      const action = a as PermissionAction

      data.push({
        id: `${_module}.${action}` satisfies PermissionId,
        module: _module,
        action,
      })
    })
  })

  try {
    await db.permission.createMany({
      data,
    })

    res.json({ ok: true, data }).send()
  } catch {
    res.json({ ok: false, data: null }).send()
  }
}
