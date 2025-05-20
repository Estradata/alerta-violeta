import { adminSchema } from '@packages/admins/schema'
import { RequestHandler } from 'express'

export const updateAdmin: RequestHandler = async (req, res, next) => {
  try {
    const data = adminSchema.parse(req.body)
    console.log(data)
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}
