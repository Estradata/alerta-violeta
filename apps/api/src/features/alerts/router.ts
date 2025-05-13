import express from 'express'
import { getAlerts } from '@/features/alerts/get-alerts'

const router = express.Router()

router.get('/', getAlerts)

export default router
