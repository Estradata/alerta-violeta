import { ValidationError } from '@packages/errors'
import { adminSchema } from '@packages/admins/schema'
import { RequestHandler } from 'express'
import { checkIsAdminEmailAvailable } from '@/features/admins/utils'
import { db } from '@/lib/db'
import { hash } from '@/utils/hash'
import { AdminRole } from '@prisma/client'
import { CreateAdminResponse } from '@packages/admins/types'

export const createAdmin: RequestHandler = async (req, res, next) => {
  try {
    const data = adminSchema.parse(req.body)

    /**
     * Check email available
     */
    const available = await checkIsAdminEmailAvailable(data.email)
    if (!available)
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
     * Create admin
     */
    const hashedPassword = await hash(data.password)
    const hasRoleSelected = data.roleId && data.roleId !== 'NONE'
    let role: AdminRole | null = null
    let customPermissions: Array<{ id: string }> = []

    if (hasRoleSelected) {
      role = await db.adminRole.findUnique({ where: { id: data.roleId! } })
    } else if (data.customPermissions.length) {
      customPermissions = data.customPermissions.map((id) => ({ id }))
    }

    await db.admin.create({
      data: {
        email: data.email,
        name: data.name,
        accountId: account.id,
        password: hashedPassword,
        roleId: role?.id,
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
