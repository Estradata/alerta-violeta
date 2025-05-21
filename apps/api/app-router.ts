import { getSafePoints } from '@/features/safe-points/get-safe-points'
import userExtractor from '@/middlewares/user-extractor-middleware'
import express from 'express'

const appRouter = express.Router()

appRouter.use(userExtractor)
  .get('/safe-points', getSafePoints)

export default appRouter
