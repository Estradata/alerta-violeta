import type { DataMsgResponse } from '@packages/misc/types'

export type AuthUser = {
  id: string
  email: string
  accountId: string
  name: string

  status: 'BLOCKED' | 'ACTIVE'
  role: 'ADMIN' | 'MEMBER'
}

export type LoginResponse = DataMsgResponse<{
  user: AuthUser
  token: string
}>
