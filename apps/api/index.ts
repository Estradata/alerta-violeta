import express from 'express'
import bodyParser from 'body-parser'
import authRouter from '@/features/auth/routes'

const app = express()
const PORT = 3003

app.use(bodyParser.json())
app.get('/', (_, res) => res.json({ ok: true }))
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
