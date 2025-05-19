import AppAuthRouter from '@/features/auth/router'
import AdminAuthRouter from '@/features/auth-admin/router'
import handleErrors from '@/middlewares/handle-errors-middleware'

import AdminRouter from './admin-router'
import AppRouter from './app-router'

import express from 'express'
import cors from 'cors'
import { AuthUser } from '@packages/auth/types'
import { AuthAdminUser } from '@packages/auth-admin/types'
import { seedDB } from './seed'

const app = express()

const ADMIN_API = '/api/admin'
const APP_API = '/api/app'

const PORT = process.env.PORT || 3003

declare global {
  namespace Express {
    interface Request {
      user: AuthUser
      admin: AuthAdminUser
    }
  }
}

function main() {
  app.use(cors())
  app.use(express.json())
  app.get('/', (_, res) => res.json({ ok: true }))

  // No Auth Needed
  app.get('/api/seed', seedDB)
  app.use(`${APP_API}/auth`, AppAuthRouter)
  app.use(`${ADMIN_API}/auth`, AdminAuthRouter)

  // Auth Needed
  app.use(`${APP_API}`, AppRouter)
  app.use(`${ADMIN_API}`, AdminRouter)

  // @ts-ignore
  app.use(handleErrors)
  app.listen(PORT, () => {
    console.log('Server initialized on: ', `http://localhost:${PORT}`)
  })
}

main()
