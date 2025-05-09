import express from 'express'
import userExtractor from '@/middlewares/user-extractor-middleware'
import { getSafePoints } from '@/features/safe-points/get-safe-points'

const router = express.Router()

router
  .use(userExtractor)
  .get('/', getSafePoints)

export default router
