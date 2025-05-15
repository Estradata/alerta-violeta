import type { DataResponse } from '../misc/types'

/**
 * Model
 */
export type UserStatus = 'ACTIVE' | 'BLOCKED'
export type User = {
  id: string
  name: string
  email: string
  status: UserStatus
  createdAt: Date
}

/**
 * API Responses
 */
// export type GetUserResponse = DataResponse<User>
export type GetUsersResponse = DataResponse<User[]>
// export type CreateUserResponse = DataMsgResponse<User>
// export type UpdateUserResponse = DataMsgResponse<User>
// export type DeleteUsersResponse = MsgResponse
