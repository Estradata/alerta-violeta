import {
  checkIsAdminEmailTaken,
  getRoleAndPermissions,
} from '@/features/admins/utils'
import { db } from '@/lib/db'
import { createActivityLog } from '@/utils/create-activity-log'
import { ensureAuth } from '@/utils/ensure-auth'
import { hash } from '@/utils/hash'
import {
  ACTION_PERMISSIONS_LABELS,
  MODULE_PERMISSIONS_LABELS,
} from '@packages/admin-permissions/consts'
import { adminSchema } from '@packages/admins/schema'
import { UpdateAdminResponse } from '@packages/admins/types'
import { ValidationError } from '@packages/errors'
import { AdminRole } from '@prisma/client'
import { RequestHandler } from 'express'

export const updateAdmin: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    ensureAuth(req.admin.permissions, 'ADMINS', 'UPDATE')

    const data = adminSchema.parse(req.body)
    const adminId = req.params.id

    /**
     * Check email available
     */
    const user = await checkIsAdminEmailTaken(data.email)

    if (user && user.id !== adminId)
      throw new ValidationError({
        email: 'Este correo no está disponible',
      })

    /**
     * Check account
     */
    const account = await db.account.findUnique({
      where: { id: req.admin.accountId },
    })

    if (!account)
      throw new ValidationError({
        accountId: 'La cuenta no existe',
      })

    /**
     * Calculate new role or permissions
     */
    const { roleId, role, customPermissions } =
      await getRoleAndPermissions(data)

    /**
     * Update admin (change password if selected)
     */
    let newPassword: string | undefined = undefined
    if (data.changePassword) newPassword = await hash(data.password)

    await db.admin.update({
      where: {
        id: adminId,
      },
      data: {
        name: data.name,
        email: data.email,
        password: newPassword,
        roleId,
        customPermissions: {
          set: customPermissions,
        },
      },
    })

    const description = await getUpdateDescription(
      req.admin.email,
      data.email,
      role,
      customPermissions
    )

    await createActivityLog({
      module: 'ADMINS',
      action: 'UPDATE',
      adminId: req.admin.id,
      description: description,
    })

    res.json({
      message: 'Administrador actualizado correctamente',
    } as UpdateAdminResponse)
  } catch (err) {
    next(err)
  }
}

async function getUpdateDescription(
  adminEmail: string,
  updatedEmail: string,
  role: AdminRole | null,
  customPermissions: { id: string }[]
) {
  let description = `${adminEmail} actualizó los permisos del administrador ${updatedEmail}: `

  if (role) {
    description += `Rol: ${role.name}`
  } else {
    const items = await db.permission.findMany({
      where: { id: { in: customPermissions.map((p) => p.id) } },
    })

    const fragments: string[] = []
    for (const item of items) {
      fragments.push(
        `${MODULE_PERMISSIONS_LABELS[item.module]}: ${ACTION_PERMISSIONS_LABELS[item.action]}`
      )
    }

    description += fragments.join(', ')
  }

  return description
}
