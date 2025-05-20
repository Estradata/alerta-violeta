import { checkIsAdminEmailTaken } from '@/features/admins/utils'
import { adminSchema } from '@packages/admins/schema'
import { ValidationError } from '@packages/errors'
import { RequestHandler } from 'express'

export const updateAdmin: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const data = adminSchema.parse(req.body)

    /**
     * Check email available
     */
    const user = await checkIsAdminEmailTaken(data.email)

    if (user && user.id !== req.params.id)
      throw new ValidationError({
        email: 'Este correo no está disponible',
      })

    console.log(data)
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}
