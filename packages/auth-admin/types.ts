import type { DataMsgResponse } from '../misc/types'

export type AuthAdminUser = {
  id: string
  email: string
  accountId: string
}

export type LoginResponse = DataMsgResponse<{
  user: AuthAdminUser
  token: string
}>
