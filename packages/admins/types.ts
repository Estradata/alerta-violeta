import type { PermissionId } from '../permissions/schema'
import type { DataResponse, MsgResponse } from '../misc/types'

export type Admin = {
  id: string
  name: string
  email: string
  permissions: PermissionId[]
  roleId: string | null
}

export type GetAdminsResponse = DataResponse<Admin[]>
export type CreateAdminResponse = MsgResponse
