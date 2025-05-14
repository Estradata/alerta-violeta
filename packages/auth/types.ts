import type { DataMsgResponse } from '../misc/types'

export type AuthUser = {
  id: string
  email: string
  accountId: string
  name: string
  status: 'BLOCKED' | 'ACTIVE'
}

export type LoginResponse = DataMsgResponse<{
  user: AuthUser
  token: string
}>
