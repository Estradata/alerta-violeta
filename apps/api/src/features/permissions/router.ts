import express from 'express'
import { getPermissions } from '@/features/permissions/get-permissions'

const permissionsRouter = express.Router()

permissionsRouter.get('/', getPermissions)

export default permissionsRouter
