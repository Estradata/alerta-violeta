import express from 'express'
import cors from 'cors'
import AuthRoutes from '@/features/auth/routes'
import handleErrors from '@/middlewares/handle-errors-middleware'

const app = express()
const API_VERSION = '/api'
const PORT = process.env.PORT || 3003

declare global {
  namespace Express {
    interface Request {
      userId: number
    }
  }
}

function main() {
  app.use(cors())
  app.use(express.json())
  app.get('/', (_, res) => res.json({ ok: true }))
  app.use(`${API_VERSION}/auth`, AuthRoutes)

  // @ts-ignore
  app.use(handleErrors)
  app.listen(PORT, () => {
    console.log('Server initialized on: ', `http://localhost:${PORT}`)
  })
}

main()
