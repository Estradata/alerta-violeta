import type { DataResponse } from '../misc/types'
import type { PermissionAction, PermissionId, PermissionModule } from './schema'

export type Permission = {
  id: PermissionId
  module: PermissionModule
  action: PermissionAction
}

export type AdminRole = {
  id: string
  name: string
  permissionIds: PermissionId[]
}

export type GetPermissionsResponse = DataResponse<Permission[]>
export type GetPermissionsRoles = DataResponse<AdminRole[]>
