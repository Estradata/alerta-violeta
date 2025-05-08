import 'module-alias/register'

import express, { Request, Response } from 'express'
import { authMiddleware } from './auth-middleware'
import {
   type PublicUser,
   publicUserSchema,
} from '@packages/validation/user-schema'
import { db } from './db'

const app = express()
const port = 3001

app.use(express.json())

// Public route
app.get('/', async (req: Request, res: Response) => {
   const user: PublicUser = {
      email: 'example@gmail.com',
      id: '1234',
      name: '1234',
   }

   const users = await db.user.findMany()

   res.json({
      message: 'This is a public route',
      user,
      validation: publicUserSchema.safeParse(user).success,
      users,
   })
})

// Protected route
app.get('/private', authMiddleware, (req: Request, res: Response) => {
   res.json({ message: 'This is a protected route' })
})

app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`)
})
