import { RequestHandler } from 'express'
import { Permission, PermissionAction, PermissionModule } from '@prisma/client'
import { db } from '@/lib/db'
import { MODULE_PERMISSIONS_MAP } from '@packages/admin-permissions/consts'
import { PermissionId } from '@packages/admin-permissions/schema'

// TODO: Create our own 'SUPER ADMIN PANEL' to manage available roles, modules, actions, etc.
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

  /**
   * Create Permissions
   */
  try {
    await db.permission.createMany({
      data,
    })
  } catch {
    console.log('Permisos duplicados, saltando...')
  }

  /**
   * Create Roles
   * Marker Editor: Full access to manage safety locations (Including bulk import/export).
   *
   */
  try {
    // Superadmin: Full system control (users, alerts, markers, settings).
    await createAdminRole('SUPER_ADMIN', 'Super Admin', [
      'ADMINS.UPDATE',
      'SAFE_POINTS.UPDATE',
      'USERS.UPDATE',
    ])

    // Monitoring Operator: Only view map safety locations and reports.
    await createAdminRole('MONITORING_OPERATOR', 'Operador de Monitoreo', [
      'SAFE_POINTS.VIEW',
      'USERS.VIEW',
    ])

    // Marker Editor: Full access to manage safety locations (Including bulk import/export).
    await createAdminRole('MARKER_EDITOR', 'Editor de Marcadores', [
      'SAFE_POINTS.UPDATE',
    ])

    // Alert Tracker: Full Access to follow up on alerts.
    await createAdminRole('ALERT_TRACKER', 'Editor de Marcadores', [])
  } catch (err) {
    console.log(err)
    console.log('Roles duplicados, saltando...')
  }

  res.json({ ok: true, data })
}

async function createAdminRole(
  id: string,
  name: string,
  permissions: PermissionId[]
) {
  await db.adminRole.create({
    data: {
      id,
      name,
      permissions: {
        connect: permissions.map((id) => ({
          id,
        })),
      },
    },
  })
}
