import type { DataResponse } from '../misc/types'
import type { PermissionAction, PermissionId, PermissionModule } from './schema'

export type Permission = {
  id: PermissionId
  module: PermissionModule
  action: PermissionAction
}

export type GetPermissionsResponse = DataResponse<Permission[]>
