import express from 'express'
import userExtractor from '@/middlewares/user-extractor-middleware'
import { getAlerts } from '@/features/alerts/get-alerts'

const router = express.Router()

router.use(userExtractor).get('/', getAlerts)

export default router
