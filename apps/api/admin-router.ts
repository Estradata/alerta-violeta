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
  .use('/permissions', PermissionsRouter)
  .use('/admins', AdminsRouter)
  .use(`/safe-points`, SafePointsRouter)
  .use(`/users`, UsersRouter)

  // TODO: add authorization validation
  .use(`/emergency-contacts`, EmergencyContactsRouter)
  .use(`/alerts`, AlertsRouter)

export default adminRouter
