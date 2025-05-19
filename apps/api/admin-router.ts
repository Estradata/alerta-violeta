import express from 'express'
import adminExtractor from '@/middlewares/admin-extractor-middleware'
import AlertsRouter from '@/features/alerts/router'
import EmergencyContactsRouter from '@/features/emergency-contacts/router'
import SafePointsRouter from '@/features/safe-points/router'
import UsersRouter from '@/features/users/router'
import PermissionsRouter from '@/features/permissions/router'
import AdminsRouter from '@/features/admins/router'

const adminRouter = express.Router()

adminRouter
  .use(adminExtractor)
  .use(`/safe-points`, SafePointsRouter)
  .use(`/emergency-contacts`, EmergencyContactsRouter)
  .use(`/alerts`, AlertsRouter)
  .use(`/users`, UsersRouter)
  .use('/permissions', PermissionsRouter)
  .use('/admins', AdminsRouter)

export default adminRouter
