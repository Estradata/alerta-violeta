import express from 'express'
import { getPermissions } from '@/features/permissions/get-permissions'
import { getPermissionsRoles } from '@/features/permissions/get-permissions-roles'

const permissionsRouter = express.Router()

permissionsRouter.get('/', getPermissions).get('/roles', getPermissionsRoles)

export default permissionsRouter
