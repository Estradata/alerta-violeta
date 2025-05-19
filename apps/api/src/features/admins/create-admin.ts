// import { db } from '@/lib/db'
import { ValidationError } from '@packages/errors'
// import { encodeUserToken } from '@/lib/jwt'
// import { hash } from '@/utils/hash'
import { adminSchema } from '@packages/admins/schema'
// import { LoginResponse } from '@packages/auth-admin/types'
import { RequestHandler } from 'express'
import { checkIsAdminEmailAvailable } from '@/features/admins/utils'

export const createAdmin: RequestHandler = async (req, _, next) => {
  try {
    const data = adminSchema.parse(req.body)

    /**
     * Check email available
     */
    const available = await checkIsAdminEmailAvailable(data.email)
    console.log(available)
    if (true)
      throw new ValidationError({
        email: 'Este correo no está disponible',
      })

    // /**
    //  * Check account
    //  */
    // const account = await db.account.findUnique({
    //   where: { id: req.admin.accountId },
    // })

    // if (!account)
    //   throw new ValidationError({
    //     accountId: 'La cuenta no existe',
    //   })

    // /**
    //  * Create user
    //  */
    // const hashedPassword = await hash(data.password)
    // const { password, ...admin } = await db.admin.create({
    //   data: {
    //     // ...data,
    //     email: data.email,
    //     name: data.name,
    //     accountId: account.id,
    //     password: hashedPassword,
    //   },
    // })

    // const userForToken = {
    //   id: admin.id,
    //   email: admin.email,
    // }

    // const token = encodeUserToken(userForToken)

    // res.json({
    //   message: 'User registration successful',
    //   data: {
    //     user: admin,
    //     token,
    //   },
    // } satisfies LoginResponse)
  } catch (err) {
    next(err)
  }
}
