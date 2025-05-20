import express from 'express'
import { getAlerts } from '@/features/alerts/get-alerts'

const alertsRouter = express.Router()

alertsRouter.get('/', getAlerts)

export default alertsRouter
