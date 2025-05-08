import express, { Request, Response } from 'express'
import { authMiddleware } from './auth-middleware'
import { type PublicUser, publicUserSchema, } from '../../packages/validation/user-schema'

const app = express()
const port = 3001

app.use(express.json())

// Public route
app.get('/', (req: Request, res: Response) => {
   const user: PublicUser = {
      email: 'example@gmail.com',
      id: '123',
      name: '123',
   }

   res.json({
      message: 'This is a public route',
      user,
      validation: publicUserSchema.safeParse(user).success,
   })
})

// Protected route
app.get('/private', authMiddleware, (req: Request, res: Response) => {
   res.json({ message: 'This is a protected route' })
})

app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`)
})
