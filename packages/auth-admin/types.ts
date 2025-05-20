import type { DataMsgResponse } from '../misc/types'
import type { Permission } from '../admin-permissions/types'

export type AuthAdminUser = {
  id: string
  name: string
  email: string
  accountId: string
  permissions: Permission[]
}

export type LoginResponse = DataMsgResponse<{
  user: AuthAdminUser
  token: string
}>
