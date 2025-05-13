import express from 'express'
import adminExtractor from '@/middlewares/admin-extractor-middleware'
import AlertsRouter from '@/features/alerts/router'
import EmergencyContactsRouter from '@/features/emergency-contacts/router'
import SafePointsRouter from '@/features/safe-points/router'

const adminRouter = express.Router()

adminRouter
  .use(adminExtractor)
  .use(`/safe-points`, SafePointsRouter)
  .use(`/emergency-contacts`, EmergencyContactsRouter)
  .use(`/alerts`, AlertsRouter)

export default adminRouter
