import express from 'express'
import userExtractor from '@/middlewares/user-extractor-middleware'
import { getSafePoints } from '@/features/safe-points/get-safe-points'
import { getSafePoint } from '@/features/safe-points/get-safe-point'
import { createSafePoint } from '@/features/safe-points/create-safe-point'
import { updateSafePoint } from '@/features/safe-points/update-safe-point'
import { deleteSafePoints } from '@/features/safe-points/delete-safe-points'

const router = express.Router()

router
  .use(userExtractor)
  .get('/', getSafePoints)
  .get('/:id', getSafePoint)
  .post('/', createSafePoint)
  .put('/:id', updateSafePoint)
  .delete('/', deleteSafePoints)

export default router
