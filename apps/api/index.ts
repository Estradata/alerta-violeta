import SafePointsRouter from '@/features/safe-points/router'
import handleErrors from '@/middlewares/handle-errors-middleware'
import express from 'express'
import EmergencyContactsRouter from '@/features/emergency-contacts/router'
import cors from 'cors'
import AuthRouter from '@/features/auth/router'
import AlertsRouter from '@/features/alerts/router'
import { AuthUser } from '@packages/auth/types'

const app = express()
const API_VERSION = '/api'
const PORT = process.env.PORT || 3003

declare global {
  namespace Express {
    interface Request {
      user: AuthUser
    }
  }
}

function main() {
  app.use(cors())
  app.use(express.json())
  app.get('/', (_, res) => res.json({ ok: true }))
  app.use(`${API_VERSION}/auth`, AuthRouter)
  app.use(`${API_VERSION}/safe-points`, SafePointsRouter)
  app.use(`${API_VERSION}/emergency-contacts`, EmergencyContactsRouter)
  app.use(`${API_VERSION}/alerts`, AlertsRouter)

  // @ts-ignore
  app.use(handleErrors)
  app.listen(PORT, () => {
    console.log('Server initialized on: ', `http://localhost:${PORT}`)
  })
}

main()
