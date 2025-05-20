import { ValidationError } from '@packages/errors'
import { adminSchema } from '@packages/admins/schema'
import { RequestHandler } from 'express'
import {
  checkIsAdminEmailTaken,
  getRoleAndPermissions,
} from '@/features/admins/utils'
import { db } from '@/lib/db'
import { hash } from '@/utils/hash'
import { CreateAdminResponse } from '@packages/admins/types'
import { ensureAuth } from '@/utils/ensure-auth'

export const createAdmin: RequestHandler = async (req, res, next) => {
  try {
    ensureAuth(req.admin.permissions, 'ADMINS', 'UPDATE')

    const data = adminSchema.parse(req.body)

    /**
     * Check email available
     */
    const isEmailTaken = await checkIsAdminEmailTaken(data.email)
    if (isEmailTaken)
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
     * Create admin
     */
    const hashedPassword = await hash(data.password)
    await db.admin.create({
      data: {
        email: data.email,
        name: data.name,
        accountId: account.id,
        password: hashedPassword,
        roleId,
        customPermissions: {
          connect: customPermissions,
        },
      },
    })

    res.json({
      message: 'Administrador creado correctamente',
    } as CreateAdminResponse)
  } catch (err) {
    next(err)
  }
}
