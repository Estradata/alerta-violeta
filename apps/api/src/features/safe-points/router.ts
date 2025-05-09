import express from 'express'
import userExtractor from '@/middlewares/user-extractor-middleware'
import { getSafePoints } from '@/features/safe-points/get-safe-points'
import { getSafePoint } from '@/features/safe-points/get-safe-point'
import { createSafePoint } from '@/features/safe-points/create-safe-point'
import { validationMiddleware } from '@/middlewares/validation-middleware'
import { safePointSchema } from '@packages/safe-points/schema'
import { updateSafePoint } from '@/features/safe-points/update-safe-point'

const router = express.Router()

router
  .use(userExtractor)
  .get('/', getSafePoints)
  .get('/:id', getSafePoint)
  .post('/', validationMiddleware(safePointSchema), createSafePoint)
  .put('/:id', validationMiddleware(safePointSchema), updateSafePoint)

export default router
