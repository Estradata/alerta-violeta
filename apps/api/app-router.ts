import userExtractor from '@/middlewares/user-extractor-middleware'
import express from 'express'

const appRouter = express.Router()

appRouter.use(userExtractor)

export default appRouter
