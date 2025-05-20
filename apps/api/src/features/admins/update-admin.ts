import {
  checkIsAdminEmailTaken,
  getRoleAndPermissions,
} from '@/features/admins/utils'
import { db } from '@/lib/db'
import { hash } from '@/utils/hash'
import { adminSchema } from '@packages/admins/schema'
import { UpdateAdminResponse } from '@packages/admins/types'
import { ValidationError } from '@packages/errors'
import { RequestHandler } from 'express'

export const updateAdmin: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
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
    const { roleId, customPermissions } = await getRoleAndPermissions(data)

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

    res.json({
      message: 'Administrador actualizado correctamente',
    } as UpdateAdminResponse)
  } catch (err) {
    next(err)
  }
}
