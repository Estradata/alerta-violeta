import { checkIsEmailAvailable } from '@/features/auth/utils'
import { db } from '@/lib/db'
import { ValidationError } from '@/lib/errors'
import { hash } from '@/utils/hash'
import { RequestHandler } from 'express'
import { SafePointData } from '@packages/safe-points/schema'

export const createSafePoint: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body as SafePointData

  } catch (err) {
    next(err)
  }
}
